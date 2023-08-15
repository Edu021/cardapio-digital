
// FILTERS FUNCTIONS
// FILTERS TESTS AND RETURN TRUE OR FALSE
// TRUE = PASS
// FALSE = FAILED
function filter() {
    return {
        // FILTERS STRINGS OR ARRAY OF STRINGS
        // FILTER: ('"!#$%¨&*=+§[]{}ºª~^`´?;:><,.\|)
        string: async function (string) {
            try {
                let promise = false;
                if (string) {
                    promise = true;
                }
                return promise;
            } catch (error) {
                console.error('Erro ao executar select:', error)
            }
        },
        password: async function (string) {
            try {
                let promise = false;
                if (0==0) {
                    
                }
                return promise
            } catch {
                console.log();
            }
        }

    }
}

module.exports = { filter }