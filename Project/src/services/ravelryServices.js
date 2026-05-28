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