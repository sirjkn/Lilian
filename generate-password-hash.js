/**
 * Password Hash Generator for Skyway Suites
 * 
 * This script generates bcrypt password hashes for use in your Neon database.
 * 
 * HOW TO USE:
 * 1. Make sure you have bcrypt installed: npm install bcrypt
 * 2. Run: node generate-password-hash.js
 * 3. Copy the generated hash and use it in your SQL INSERT statement
 */

const bcrypt = require('bcrypt');

// Configuration
const PASSWORDS_TO_HASH = [
  { label: 'Admin Password', password: 'admin123' },
  { label: 'Customer Password', password: 'customer123' },
  { label: 'Test Password', password: 'test123' },
];

const SALT_ROUNDS = 10; // Standard bcrypt rounds

async function generateHashes() {
  console.log('🔐 Generating Bcrypt Password Hashes for Skyway Suites\n');
  console.log('=' .repeat(60));
  
  for (const item of PASSWORDS_TO_HASH) {
    const hash = await bcrypt.hash(item.password, SALT_ROUNDS);
    console.log(`\n${item.label}: "${item.password}"`);
    console.log(`Hash: ${hash}`);
    console.log('-'.repeat(60));
  }
  
  console.log('\n✅ Done! Use these hashes in your SQL INSERT statements.\n');
  console.log('Example SQL:');
  console.log(`INSERT INTO users (email, name, password_hash, role) VALUES`);
  console.log(`('admin@skywaysuites.com', 'Admin User', '${await bcrypt.hash('admin123', SALT_ROUNDS)}', 'admin');`);
}

// Run the generator
generateHashes().catch(console.error);
