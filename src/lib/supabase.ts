import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://lbidgjmkjdjfwgyokrgx.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc3MDA1M2U1LTJkMWUtNDI0OS04OGM4LTMzOGMzNzc3ZmE3OSJ9.eyJwcm9qZWN0SWQiOiJsYmlkZ2pta2pkamZ3Z3lva3JneCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgwODQ1NzY5LCJleHAiOjIwOTYyMDU3NjksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0._SL5SBLTqrAdFVBlOAbcVXCRxUgLwRvuEg7g2cikock';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };