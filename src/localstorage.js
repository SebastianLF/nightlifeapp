 export const loadJwtToken = () => {
   try {
     const token = localStorage.getItem('token');
     if (!token) {
       return undefined;
     }

     return JSON.parse(token);

   } catch (err) {
     return undefined;
   }
 }

 export const saveJwtToken = (token) => {
   try {
     localStorage.setItem('token', JSON.stringify(token));
   } catch (err) {
     console.log('Error saving token into localStorage.');
   }
 }

 export const deleteJwtToken = () => {
   try {
     localStorage.removeItem('token');
   } catch (err) {
     console.log('Error deleting token from localStorage.');
   }
 }

 export const saveSettings = (settings) => {
   try {
     localStorage.setItem('settings', JSON.stringify(settings));
   } catch (err) {
     console.log('Error saving settings into localStorage.');
   }
 }

 export const loadSettings = () => {
   try {
     const settings = localStorage.getItem('settings');
     return JSON.parse(settings);
   } catch (err) {
     console.log('Error loading settings into localStorage.');
   }
 }

 export const saveSelectedBar = (selectedBar) => {
   try {
     localStorage.setItem('selectedBar', JSON.stringify(selectedBar));
   } catch (err) {
     console.log('Error saving selectedBar into localStorage.');
   }
 }

 export const loadSelectedBar = () => {
   try {

     const selectedBar = localStorage.getItem('selectedBar');
     if (!selectedBar) {
       return undefined;
     }

     return JSON.parse(selectedBar);
   } catch (err) {
     console.log('Error loading selectedBar into localStorage.');
   }
 }
