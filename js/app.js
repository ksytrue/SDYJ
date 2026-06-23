(function () {
    // Tab navigation
    const tabLinks = document.querySelectorAll('[data-tab]');
    const tabSections = document.querySelectorAll('.tab-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    function switchTab(tabName) {
        tabSections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById('tab-' + tabName);
        if (target) target.classList.add('active');

        navLinks.forEach(l => {
            if (l.dataset.tab === tabName) l.classList.add('active');
        });

        // Reset sub-views
        const articleViewer = document.getElementById('article-viewer');
        const magazineList = document.getElementById('magazine-list');
        if (articleViewer) articleViewer.classList.remove('active');
        if (magazineList) magazineList.style.display = '';

        navLinksContainer.classList.remove('open');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const tab = this.dataset.tab;
            if (tab) switchTab(tab);
        });
    });

    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinksContainer.classList.toggle('open');
        });
    }

    // ===== Videos =====
    const videoGrid = document.getElementById('video-grid');
    const videoModal = document.getElementById('video-modal');
    const modalClose = document.getElementById('modal-close');
    const modalVideoPlayer = document.getElementById('modal-video-player');
    const modalTitle = document.getElementById('modal-title');
    const modalCreator = document.getElementById('modal-creator');
    const modalIndex = document.getElementById('modal-index');
    const modalDescription = document.getElementById('modal-description');
    const modalTimestamps = document.getElementById('modal-timestamps');

    function renderVideos() {
        if (!videoGrid) return;

        if (videosData.length === 0) {
            videoGrid.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <h3>아직 영상이 없습니다</h3>
                    <p>곧 새로운 영상이 업로드됩니다.</p>
                </div>`;
            return;
        }

        videoGrid.innerHTML = videosData.map(function (video, idx) {
            return '<div class="video-card" data-video-id="' + video.id + '">' +
                '<div class="video-thumb">' +
                (video.thumbnail
                    ? '<img src="' + video.thumbnail + '" alt="' + video.title + '">'
                    : '<div class="video-thumb-placeholder">&#9654;</div>') +
                '<div class="video-play-icon">' +
                '<svg viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
                '</div></div>' +
                '<div class="video-info">' +
                '<h3>' + video.title + '</h3>' +
                '<div class="video-meta">' +
                '<span class="video-creator">' + video.creator + '</span>' +
                '</div></div></div>';
        }).join('');

        videoGrid.querySelectorAll('.video-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var id = parseInt(this.dataset.videoId);
                openVideoModal(id);
            });
        });
    }

    function openVideoModal(id) {
        var video = videosData.find(function (v) { return v.id === id; });
        if (!video) return;

        modalVideoPlayer.src = video.src;
        modalTitle.textContent = video.title;
        modalCreator.textContent = video.creator;
        modalIndex.textContent = '#' + video.id;
        modalDescription.textContent = video.description;

        if (video.timestamps && video.timestamps.length > 0) {
            modalTimestamps.innerHTML = '<h3>영상 인덱스</h3><ul class="timestamp-list">' +
                video.timestamps.map(function (ts) {
                    return '<li class="timestamp-item" data-time="' + ts.time + '">' +
                        '<span class="timestamp-time">' + ts.time + '</span>' +
                        '<span class="timestamp-label">' + ts.label + '</span></li>';
                }).join('') + '</ul>';

            modalTimestamps.querySelectorAll('.timestamp-item').forEach(function (item) {
                item.addEventListener('click', function () {
                    var timeParts = this.dataset.time.split(':');
                    var seconds = 0;
                    if (timeParts.length === 2) {
                        seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
                    } else if (timeParts.length === 3) {
                        seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
                    }
                    modalVideoPlayer.currentTime = seconds;
                    modalVideoPlayer.play();
                });
            });
        } else {
            modalTimestamps.innerHTML = '';
        }

        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        modalVideoPlayer.pause();
        modalVideoPlayer.src = '';
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeVideoModal);
    if (videoModal) {
        videoModal.addEventListener('click', function (e) {
            if (e.target === videoModal) closeVideoModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    renderVideos();

    // ===== Magazines =====
    var magazineList = document.getElementById('magazine-list');
    var articleViewer = document.getElementById('article-viewer');
    var articleContent = document.getElementById('article-content');
    var backToList = document.getElementById('back-to-list');

    function renderMagazines() {
        if (!magazineList) return;

        if (magazinesData.length === 0) {
            magazineList.innerHTML = '<div class="empty-state">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>' +
                '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' +
                '<h3>아직 매거진이 없습니다</h3>' +
                '<p>곧 새로운 글이 게시됩니다.</p></div>';
            return;
        }

        magazineList.innerHTML = magazinesData.map(function (mag) {
            return '<div class="magazine-card" data-slug="' + mag.slug + '">' +
                '<div class="magazine-card-body">' +
                '<h3>' + mag.title + '</h3>' +
                '<p>' + mag.summary + '</p>' +
                '<div class="magazine-card-meta">' +
                '<span>' + mag.author + '</span>' +
                '<span>' + mag.date + '</span>' +
                '</div></div>' +
                '<div class="magazine-card-arrow">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">' +
                '<path d="M9 18l6-6-6-6"/></svg></div></div>';
        }).join('');

        magazineList.querySelectorAll('.magazine-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var slug = this.dataset.slug;
                openArticle(slug);
            });
        });
    }

    function openArticle(slug) {
        var mag = magazinesData.find(function (m) { return m.slug === slug; });
        if (!mag) return;

        fetch(mag.file)
            .then(function (res) {
                if (!res.ok) throw new Error('Failed to load');
                return res.text();
            })
            .then(function (md) {
                var html = marked.parse(md);
                articleContent.innerHTML =
                    '<div class="article-meta">' + mag.author + ' &middot; ' + mag.date + '</div>' + html;
                magazineList.style.display = 'none';
                articleViewer.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(function () {
                articleContent.innerHTML = '<p>글을 불러오는 데 실패했습니다.</p>';
                magazineList.style.display = 'none';
                articleViewer.classList.add('active');
            });
    }

    if (backToList) {
        backToList.addEventListener('click', function () {
            articleViewer.classList.remove('active');
            magazineList.style.display = '';
        });
    }

    renderMagazines();
})();
