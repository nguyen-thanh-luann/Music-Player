
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const MUSIC_PLAYER_KEY = 'MUSIC-PLAYER'
const heading = $('.music-playing-name')
const musicThumb = $('.music-playing-img')
const audio = $('#audio')
const playBtn = $('.playBtn')
const progress = $('#progress')
const nextBtn = $('.next')
const previousBtn = $('.back')
const randomBtn = $('.shuffle')
const repeatBtn = $('.repeat')
const playList = $('.playlist')


const app = {
    currentIndex: 0,
    isRandom: false,
    isPlaying: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(MUSIC_PLAYER_KEY)) || {},
    setConfig: function(key, value){
        this.config[key] =value;
        localStorage.setItem(MUSIC_PLAYER_KEY, JSON.stringify(this.config))
    },
  
    songs: [
        {
            name: 'Better Days',
            singer: 'Mae Muller, Neiked, Polo G',
            path: 'assets/music/BetterDays.mp3',
            image: 'assets/image/betterDays.png'
        },
        {
            name: 'Go',
            singer: 'The Chemical Brothers',
            path: 'assets/music/Go.mp3',
            image: 'assets/image/go.png'
        },
        {
            name: 'Good Day',
            singer: 'Greg Street',
            path: 'assets/music/goodDay.mp3',
            image: 'assets/image/goodDay.png'
        },
        {
            name: 'Anh Luôn Là Lý do',
            singer: 'Erik',
            path: 'assets/music/Anh-Luon-La-Ly-Do-ERIK.mp3',
            image: 'assets/image/anhLuonLaLyDo.png'
        },
        {
            name: 'Lemon Tree',
            singer: 'Mina',
            path: 'assets/music/Lemon-Tree-Mina.mp3',
            image: 'assets/image/lemonTree.png'
        },
        {
            name: 'Lời Yêu Ngây Dại',
            singer: 'Cowvy, X-Sol, Kha',
            path: 'assets/music/Loi-Yeu-Ngay-Dai-Cowvy-X-Sol-Mix-Kha.mp3',
            image: 'assets/image/loiYeuNgayDai.png'
        },
        {
            name: 'Ngại Gì',
            singer: 'Kay Tran',
            path: 'assets/music/Ngai-Gi-Kay-Tran-Torick.mp3',
            image: 'assets/image/ngaiGi.png'
        },
        {
            name: 'Phía Sau Em',
            singer: 'Kay Tran x Binz',
            path: 'assets/music/Phia-Sau-Em-Kay-Tran-Binz.mp3',
            image: 'assets/image/phiaSauEm.png'
        },
        {
            name: 'Từ Ngày Em Đến',
            singer: 'Da Lab',
            path: 'assets/music/Tu-Ngay-Em-Den-Da-LAB.mp3',
            image: 'assets/image/tuNgayEmDen.png'
        },
        {
            name: 'Ý Em Sao?',
            singer: 'Kay Tran x Lang-LD',
            path: 'assets/music/Y-Em-Sao-Kay-Tran-Lang-LD.mp3',
            image: 'assets/image/yEmSao.png'
        },
        {
            name: 'Ai Muốn Nghe Không',
            singer: 'Đen',
            path: 'assets/music/ai-muon-nghe-khong.mp3',
            image: 'assets/image/ai-muon-nghe-khong.png'
        },
        {
            name: 'Demon',
            singer: 'Imagine Dragons',
            path: 'assets/music/Demon.mp3',
            image: 'assets/image/demon.png'
        },
        {
            name: 'Friends',
            singer: 'MarshMello x Anne-Marie',
            path: 'assets/music/FRIENDS.mp3',
            image: 'assets/image/friend.png'
        },
        {
            name: 'Havana',
            singer: 'Camila',
            path: 'assets/music/Havana.mp3',
            image: 'assets/image/havana.png'
        },
        {
            name: 'Holy',
            singer: 'Justin Bieber',
            path: 'assets/music/Holy.mp3',
            image: 'assets/image/holy.png'
        },
        {
            name: 'How Long',
            singer: 'Charlie Puth',
            path: 'assets/music/howLong.mp3',
            image: 'assets/image/howlong.png'
        },
        {
            name: 'I Dont Care',
            singer: 'Justin Bieber',
            path: 'assets/music/IDontCare.mp3',
            image: 'assets/image/idontcare.png'
        },
        {
            name: 'I Really Like You',
            singer: 'Carly Rae Jepsen',
            path: 'assets/music/IReallyLikeYou.mp3',
            image: 'assets/image/ireallylikeyou.png'
        },
        {
            name: 'Memories',
            singer: 'Maroon 5',
            path: 'assets/music/Memories.mp3',
            image: 'assets/image/memories.png'
        },
        {
            name: 'On My Way',
            singer: 'Alan Walker',
            path: 'assets/music/onMayWay.mp3',
            image: 'assets/image/onMayWay.png'
        },
        {
            name: 'Senorita',
            singer: 'Shawn Mendes x Camila Cabello',
            path: 'assets/music/Senorita.mp3',
            image: 'assets/image/senorita.png'
        },
    
    ],
    render: function(){

        const htmls = this.songs.map((song, index) => {
            return `
            <div data-index="${index}" class="song ${index === this.currentIndex ? 'song-active' : '' }">
                <div class="thumb">
                    <img class='music-img' src='${song.image}'/>
                </div>
                <div class="body">
                    <h3>${song.name}</h3>
                    <p>${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
            
                </div>
            </div>
            `
        })

        playList.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong',{
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    }
    ,
    handleEvents: function(){
        
        //play music
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause()
            }else{
             audio.play()
            }
        }

        //song is played
        audio.onplay = function(){
            musicThumbAnimate.play();
            app.isPlaying = true;
            playBtn.classList.remove('fa-play')
            playBtn.classList.add('fa-pause')
        }

        //song is paused
        audio.onpause = function(){
            app.isPlaying = false;
             musicThumbAnimate.pause();
            playBtn.classList.remove('fa-pause')
            playBtn.classList.add('fa-play')

        }

        //song progress
        audio.ontimeupdate = function(){
            if(audio.duration){
                progress.value = Math.floor(audio.currentTime / audio.duration *100)
            }
        }

        //fast forward song
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime

        }

        // spin around cd when song playing
        const musicThumbAnimate = musicThumb.animate([
            {transform: 'rotate(360deg)'}
        ],
            {
                duration: 10000,
                iterations: Infinity
            }
        )
        musicThumbAnimate.pause();

        //next song
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else{
                app.nextSong()
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }
        //previous song
        previousBtn.onclick = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else{
                app.previousSong();
            }
           
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }

        //click song in playList
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.song-active)')

            if(songNode || e.target.closest('.option')){ 
                if(songNode){
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }

                if(e.target.closest('.option')){ 
                    //option handler
                }
            }

        }




        //random song
        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom)
            randomBtn.classList.toggle('active', app.isRandom)
        }

        //repeat song
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat)
            repeatBtn.classList.toggle('active', app.isRepeat)
        }

        //next song when currensong on end
        audio.onended = function(){
            if(app.isRandom){
                app.playRandomSong()
            }else if(app.isRepeat){
                audio.load();
            }else{
                app.nextSong()
            }
            audio.play();
        }

    },
    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()

    },
    scrollToActiveSong: function(){
        setTimeout(function(){
            $('.song-active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 150)
    }
    ,
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        musicThumb.src = this.currentSong.image
        audio.src = this.currentSong.path
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    }
    ,
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        app.loadCurrentSong();
    },
    previousSong: function(){
        this.currentIndex--
        if(this.currentIndex <=0){
            this.currentIndex = this.songs.length-1
        }
        app.loadCurrentSong();
    }
    ,
    start: function(){
        //load default config on localStorage
        this.loadConfig()

        //define any propertise
        this.defineProperties()

        //listen and handler (DOM events)
        this.handleEvents()

        
        this.loadCurrentSong()
        
        //render playLists
        this.render()

        //display status of config
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    },
}

app.start()
