import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function getUser(setError: Function) {
  const {
    data: { user }, error
  } = await supabase.auth.getUser();

  if (error || !user) {
    setError('User not authenticated');
    return null;
  }

  return user.id;
}

export async function uploadImageToSupabase(file:File, draftId:string, userId: string){
  const fileExt = file.name.split('.').pop()
  const filePath = `drafts/${userId}/${draftId}/${Math.random()}.${fileExt}`

  const {data, error} = await supabase.storage.from('book_images').upload(filePath, file);

  if(error){
    console.error("Error uploading image:", error); 
    return null;
  }
  return data?.path;
}

export async function reuploadBookImageToSupabase(file: File, draftId: string, userId: string, imageFile?: string){
  const fileExt = file.name.split('.').pop()
  const filePath = `drafts/${userId}/${draftId}/${Math.random()}.${fileExt}`
  
  if(imageFile){
    await supabase.storage.from('book_images').remove([imageFile]); 
  }

  const{data, error}  =  await supabase.storage.from('book_images').upload(filePath, file)

  await supabase.from('drafts').update({book_image: data?.path}).eq('draft_id', draftId); 

  if(error){
    console.error("Error uploading image", error);
  }
}

export async function handleSubmitDraft(bookImage: File | null, titleContent: string, content: string, setError: Function, title: string) {
  const authoruid = await getUser(setError);
    if (!authoruid) return;

    const draftData = {
      author_id: authoruid, 
      title: title, 
      book_image: '',
      book_synopsis: '',
      book_genre: [],
      draft_chapters: [{
        title: titleContent,
        content: content,
        createdAt: new Date()
      }]
    }
    const {data, error} = await supabase
      .from('drafts')
      .insert(draftData)
      .select('draft_id')
      .single(); 


    if(error){
      setError(error.message); 
      console.log(error);
      return; 
      
    }

    const draftId = data?.draft_id;

    if (!draftId) {
      setError("Draft ID could not be generated.");
      return;
    }

    let bookImageUrl; 
    if(bookImage){
      bookImageUrl = await uploadImageToSupabase(bookImage, draftId, authoruid);
      if(!bookImageUrl){
        setError("Image upload failed.");
        return;
      }

      const { error: updateError } = await supabase
      .from('drafts')
      .update({ book_image: bookImageUrl })
      .eq('draft_id', draftId);

      if (updateError) {
        setError(updateError.message);
        console.log(updateError);
        return;
      }

    }



    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('drafts')
      .eq('id', authoruid)
      .single();
  
    if (profileError) {
      setError(profileError.message);
      console.log(profileError);
      return;
    }

    const currentDrafts = profileData?.drafts || [];
    const updatedDrafts = [...currentDrafts, draftId];


    const { error: updateError } = await supabase
    .from('profiles')
    .update({ drafts: updatedDrafts })
    .eq('id', authoruid);

    if (updateError) {
      setError(updateError.message);
      console.log(updateError);
    } else {
      console.log('Draft added successfully');
      return draftId;
    }
    
}

export async function handleSumbitAnotherDraftChapter(draftId: string, titleContent: string, content: string, setError: Function) {

  try {
    const authoruid = await getUser(setError);
    if (!authoruid) return;

    // Append the new chapter
    const newChapter = {
      title: titleContent,
      content: content,
      createdAt: new Date()
    };

    const { error } = await supabase.rpc('append_draft_chapter', {
      draft_id_param: draftId,
      new_chapter: newChapter
    });

    if(error){
      console.error("Error updating draft:", error);
      setError(error.message);
      return null;
    }

    console.log("Chapter added successfully!");
    return draftId; // Return the draft ID so you can navigate back

  }catch(err){
    console.error("Error submitting another chapter:", err);
    setError("An error occurred while submitting the chapter.");
    return null;
  }
 
}

export async function handleEditChapter(setError: Function, titleContent: string, content: string, index:number, draftId: string) {
  try{
    const authoruid = await getUser(setError);
    if (!authoruid) return;

    const newChapterData = {
      title: titleContent,
      content: content,
      createdAt: new Date()
    }

    const {data, error} = await supabase.rpc('update_draft_chapter', {
      d_id: draftId,
      index: index + 1,
      new_chapter: newChapterData
    })

    if (error) {
      console.error('Error updating draft chapter:', error);
      return;
    }

    console.log('Draft chapter updated successfully:', data);

  }catch(err){
    console.log("Error updating chapter info", err); 
  }
}

