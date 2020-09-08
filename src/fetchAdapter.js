class FetchAdapter {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    get(relativeUrl, callback) {

        fetch(`${this.baseUrl}${relativeUrl}`) // &limit_9
            .then(resp => resp.json())
            .then(callback)

    }

}