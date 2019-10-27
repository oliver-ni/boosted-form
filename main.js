let app = new Vue({
    el: '#idForm',
    data: {
        form: form,
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
                    return `/get_url/ssn_card/${state.answer}`;
                } else if (!idQ.stateID) {
                    return `/get_url/state_id/${state.answer}`;
                } else if (!idQ.passport) {
                    return `/get_url/us_passport/${state.answer}`;
                }

            }

        },
        doRequest(path) {
            const a = getRequest(path);
        }
    }
});