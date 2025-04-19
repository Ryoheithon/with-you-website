require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Admin email from environment variables
const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

if (!adminEmail) {
  console.error('Missing admin email in environment variables');
  process.exit(1);
}

async function createAdminUser() {
  console.log(`Creating admin user with email: ${adminEmail}`);
  
  try {
    // Check if the user already exists
    const { data: existingUser, error: getUserError } = await supabase.auth.admin.getUserByEmail(adminEmail);
    
    if (getUserError && getUserError.message !== 'User not found') {
      console.error('Error checking if user exists:', getUserError);
      process.exit(1);
    }
    
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }
    
    // Generate a random password
    const password = Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-2) + '!';
    
    // Create the user
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password,
      email_confirm: true
    });
    
    if (error) {
      console.error('Error creating admin user:', error);
      process.exit(1);
    }
    
    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', password);
    console.log('Please save this password and use it to log in to the admin dashboard.');
    console.log('You can change your password after logging in.');
  } catch (error) {
    console.error('Unexpected error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
