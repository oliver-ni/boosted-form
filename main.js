let app = new Vue({
    el: '#idForm',
    data: {
        form: form,
        loading: false,
    },
    methods: {
        checkCriteria(question) {

            const answers = this.answers;

            if (question.hasOwnProperty("if")) {
                for (const ans in question.if) {
                    const checkQuestion = this.form.find(q => q.name == ans);
                    if (checkQuestion.type == "boolean" && checkQuestion.answer != question.if[ans]) {
                        return false;
                    }
                }
            }

            return true;
        },
        getRequest(path) {

            if (path == 0) {

                const idQ = this.form.find(q => q.name == "typeID").choices.reduce((acc, cur) => {
                    acc[cur.name] = cur.answer;
                    return acc;
                }, {});

                const state = this.form.find(q => q.name == "docsState1");
                console.log(state);
                console.log("test")

                if (!idQ.socialSec) {
                    return `/get_url/ssn_card/FE`;
                } else if (!idQ.stateID) {
                    return `/get_url/state_id/${state.answer}`;
                } else if (!idQ.passport) {
                    return `/get_url/us_passport/FE`;
                }

            } else if (path == 1) {

                const state = this.form.find(q => q.name == "docsState");
                return `/get_url/state_id/${state.answer}`;

            } else if (path == 2) {

                let country = this.form.find(q => q.name == "docsCountry").answer;
                country = country.toLowerCase().replace(/ /g, "-");
                return `/get_embassy/${country}`;

            } else if (path == 3) {
                const state = this.form.find(q => q.name == "bornState");
                return `/get_url/vital_records/${state.answer}`;
            } else if (path == 4) {

                let country = this.form.find(q => q.name == "bornCountry").answer;
                country = country.toLowerCase().replace(/ /g, "-");
                return `/get_embassy/${country}`;

            }

        },
        doRequest(path) {
            const a = this.getRequest(path);
            this.loading = true;
            axios.get(`http://167.71.116.162${a}`).then((res) => {

                this.loading = false;

                window.location.href = res.data;

            });
        }
    }
});