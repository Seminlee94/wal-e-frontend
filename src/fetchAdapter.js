class FetchAdapter {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    get(relativeUrl, callback) {

        fetch(`${this.baseUrl}${relativeUrl}`) // &limit_9
            .then(resp => resp.json())
            .then(callback)

    }

    set(relativeUrl, options) {
        
        fetch(`${this.baseUrl}${relativeUrl}`, options) // &limit_9
        .then(resp => resp.json())
    }

}