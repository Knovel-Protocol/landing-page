'use server'

import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function addWalletAddress(address: string, network: number, userId: string){
  try{
    const {data, error} = await supabase
      .from('profiles')
      .select('wallet_addresses')
      .eq('id', userId)
      .single();

      const wallet_addresses = [{
        "network": network,
        "address": address
      }]

      if(!data?.wallet_addresses){
        await supabase
          .from('profiles')
          .update({wallet_addresses: wallet_addresses})
          .eq('id', userId); 

      }else{
        let walletAddresses = data.wallet_addresses; 

        // Check if the network already exists
        const networkIndex = walletAddresses.findIndex((entry: any) => entry.network === network);

        if(networkIndex === -1){
          walletAddresses.push(wallet_addresses); 
        }else{
          // Network exists, check if the address exists
          const addressExists = walletAddresses[networkIndex].address === address;
          if(!addressExists){
            walletAddresses[networkIndex].address = address;
          }else{
            return;
          }
        }

        // Update the Supabase profile with the new/updated wallet addresses
          const {error: updateError} = await supabase
            .from('profiles')
            .update({wallet_addresses: wallet_addresses})
            .eq('id', userId); 

          if (updateError) {
            throw new Error('Error updating wallet addresses');
          }
      }
  }catch(err){
    console.error(err);
  }
}