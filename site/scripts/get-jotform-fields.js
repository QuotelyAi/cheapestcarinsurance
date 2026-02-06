#!/usr/bin/env node

require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });

if (!process.env.JOTFORM_API_KEY) {
  console.error('❌ Error: JOTFORM_API_KEY environment variable is required');
  console.error('Set it in your .env.local file');
  process.exit(1);
}

const apiKey = process.env.JOTFORM_API_KEY;
const formId = process.env.JOTFORM_FORM_ID || '242546337686164';

async function getFormFields() {
  try {
    console.log(`\n🔍 Fetching JotForm field IDs for form ${formId}...\n`);

    const response = await fetch(
      `https://api.jotform.com/v1/form/${formId}?apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const questions = data.content.questions || {};

    console.log('📋 Form Fields Found:\n');
    console.log('const fieldMapping: Record<string, string> = {');

    Object.entries(questions).forEach(([fieldId, field]) => {
      const fieldText = field.text || field.type || 'Unknown';
      const cleanText = String(fieldText)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

      console.log(`  ${cleanText}: '${fieldId}', // ${fieldText}`);
    });

    console.log('};\n');

    console.log('📝 Copy the above mapping to: src/app/api/jotform/prefill/route.ts');
    console.log('   Update the fieldMapping object (around line 30)\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getFormFields();
