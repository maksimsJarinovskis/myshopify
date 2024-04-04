
const form = document.querySelector('#registration-form');
const gqlUrl = 'https://maksims-jarinovskis.myshopify.com/api/2024-04/graphql.json';
const submitButton = document.querySelector('[type="submit"]');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        submitButton.setAttribute('disabled', true);
        const formData = new FormData(form);
        const password = formData.get('password');
        const email = formData.get('email');

        const query = {
            query: "mutation customerCreate($input: CustomerCreateInput!) { customerCreate(input: $input) { customer { firstName lastName email phone acceptsMarketing } customerUserErrors { field message code } } }",
             variables: {
                input: {
                  "firstName": "John",
                  "lastName": "Smith",
                  email,
                  password,
                  "acceptsMarketing": true
                }
             }
        }

        const response = await fetch(gqlUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'aaf2549320011ed61285590042238717'
            },
            body: JSON.stringify(query)
        });
        const responseData = await response.json();
        const  { data } = responseData;

        if ( data?.customerCreate?.customerUserErrors ) {
            throw new Error(response.customerCreate.customerUserErrors[0].message);
        }
        if (responseData?.errors) {
            throw new Error(responseData.errors[0]?.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later. ' + error.message);
    } finally {
        submitButton.removeAttribute('disabled');
    }
});