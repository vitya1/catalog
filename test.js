 
let r = {ddddd: 0};

console.log(r['ddddd'] || 'asdfghj');

function er() {
    throw 'dfdf';
    console.log(565656);
}


loadData() {
    try {
        const response = await axios.get('/data1.json', {timeout: 10});
        if(!response.data.Success || response.data.Error) {
            throw response.data.Error || this.error_text;
        }
        if(this.goods !== null) {
            this.old_prices = {};
            for(let i in this.goods.Value.Goods) {
                let item = this.goods.Value.Goods[i];
                this.old_prices[item.T] = item.C;
            }
        }
        this.goods = response.data;
    }
    catch(e) {
        console.log(e);
    }
    finally {
        console.log(10101);
        setTimeout(() => this.loadData(), 3000);

    }
};


try {
    er();
}
catch(e) {
    console.log(e);
}
