new Vue({
    el: '#app',
    data:{
        posts_data: [], search: '', awal: 0, akhir: 10, halaman: 1, tampil: true
    },
    created(){
        this.getData();
        console.log(this.posts_data.awal);
    },
    methods:{
        next(){
            this.awal = this.awal+=10
            this.akhir = this.akhir+=10
            this.halaman = this.halaman+=1
        },
        prev(){
            this.awal = this.awal-=10
            this.akhir = this.akhir-=10
            this.halaman = this.halaman-=1
        },
        getData(){
            let self = this;
            axios('https://cors.lazydev.me/https://simpleblog.projects.lazydev.me/api/posts')
                .then(response => self.posts_data = response.data)
                .catch(err => console.log(err));
            //let obj = JSON.parse(self.posts_data);
        }
    },
    computed:{
        cari(){
            return this.posts_data.filter(post => {
                return post.title.toLowerCase().match(this.search.toLowerCase());
            });
        }
    }
});
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function() {
            console.log("SW registered");
        })
}