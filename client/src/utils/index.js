import {surpriseMePrompts} from '../constants' 
//import FileServer from 'file-server'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]

    if(randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    try {
      // Fetch the image data
      const response = await fetch(photo);
  
      // Convert the response to a blob
      const blob = await response.blob();
  
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `download-${_id}.jpeg`;
  
      // Trigger the click event on the link
      link.click();
  
      // Clean up by revoking the blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }
  