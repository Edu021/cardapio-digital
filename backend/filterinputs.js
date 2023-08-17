
// FILTERS FUNCTIONS
// FILTERS TESTS AND RETURN TRUE OR FALSE
// TRUE = PASS
// FALSE = FAILED
function filter() {
    return {
        // FILTER STRING
        string: async function (input) {
            try {
                if (typeof input !== 'string') {
                    throw new Error('Input should be a string');
                  }
                
                  // Remove espaços vazios no início e no final da entrada
                  const trimmedInput = input.trim();
                  
                  // Remove caracteres especiais que poderiam ser usados em ataques de SQL Injection
                  const sanitizedInput = trimmedInput.replace(/['";\\]/g, '');
                  return sanitizedInput;
            } catch (error) {
                console.error('Erro ao filtrar:', error)
            }
        }

    }
}

module.exports = { filter }