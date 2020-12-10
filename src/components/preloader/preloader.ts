import '../../style/preloader.css'
export class Preloader {
    private preloader: HTMLDivElement;

    constructor() {
    }

    start() {
        const preloader = document.querySelector('.preloader')
        if (preloader) {
            preloader.parentNode.removeChild(preloader)
        }
        function _createPreloader() {
            const preloader = document.createElement('div')
            preloader.classList.add('preloader')
            preloader.insertAdjacentHTML('afterbegin', `
                <div class="block"></div>
            `)
            document.querySelector('[data-preloader]').appendChild(preloader)
            return preloader
        }

        this.preloader = _createPreloader()
        const block: any = document.querySelector('.block')
        let whith = 0
        let margin = 0
        setInterval((a=0.5) => {
            if (whith !== 100) {
                block.style.marginLeft = '0'
                whith += a
                block.style.width = `${whith}%`
            } else {
                if (margin !== 100) {
                    margin += a
                    const delta = whith - margin
                    block.style.marginLeft = `${margin}%`
                    block.style.width = `${delta}%`
                } else {
                    whith = null
                    margin = null
                }
            }

        }, 10)
    }

    removePreloader() {
        if (this.preloader) {
            this.preloader.parentNode && this.preloader.parentNode.removeChild(this.preloader)
        }
    }
}
