/*
import api from './api';

export default {

    searchYarns(query) {
        return api.get(`/yarns/search?q=${query}`);
    },

    getPatterns() {
        return api.get('/patterns');
    },

    getBrandDetails(brandId) {
        return api.get(`/brands/${brandId}`);
    }
}

 */

import { mockBrandProducts } from '@/mocks/brandData';

export default {
    async getBrandProducts() {
        // Simuliert eine Netzwerk-Antwortzeit von 500 Millisekunden
        return new Promise((resolve) => {
            setTimeout(() => {
                // Wir verpacken die Daten in ein 'data'-Objekt,
                // genau wie es axios später bei der echten API machen wird
                resolve({ data: mockBrandProducts });
            }, 500);
        });
    }
}