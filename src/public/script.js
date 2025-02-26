console.log('script.js loaded');

async function searchCep() {
    const cep = document.getElementById('cepInput').value;
    const resultDiv = document.getElementById('addressResult');
    
    // Clear the previous result
    resultDiv.innerHTML = '';

    if (!cep) {
        resultDiv.innerHTML = 'Please enter a postal code.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/cep/${cep}`);
        
        if (response.status === 404) {
            resultDiv.innerHTML = 'CEP not found.';
        } else if (response.status === 500) {
            resultDiv.innerHTML = 'Error while fetching data.';
        } else {
            const data = await response.json();
            resultDiv.innerHTML = `
                <p><strong>CEP:</strong> ${data.cep}</p>
                <p><strong>Street:</strong> ${data.logradouro}</p>
                <p><strong>Neighborhood:</strong> ${data.bairro}</p>
                <p><strong>City:</strong> ${data.cidade}</p>
                <p><strong>State:</strong> ${data.estado}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error while fetching data.';
    }
}
