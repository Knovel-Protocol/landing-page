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

export async function uploadImageToSupabase(file:File){
  const {data, error} = await supabase.storage.from('book_images').upload(`public/${file.name}`, file);

  if(error){
    console.error("Error uploading image:", error); 
    return null;
  }

return data?.path;
}

export async function handleSubmitDraft(bookImage: File | null, titleContent: string, content: string, setError: Function) {
  const authoruid = await getUser(setError);
    if (!authoruid) return;

    const bookImageUrl = bookImage ? await uploadImageToSupabase(bookImage) : ''; 
    const draftData = {
      author_id: authoruid, 
      title: '', 
      book_image: bookImageUrl,
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

    if(draftId){
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

