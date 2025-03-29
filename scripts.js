document.addEventListener("DOMContentLoaded", () => {
    // Animation cho Hero Section (Trang Chủ)
    gsap.from(".hero h1", { duration: 1, y: -50, opacity: 0, delay: 0.5 });
    gsap.from(".hero p", { duration: 1, y: -50, opacity: 0, delay: 0.7 });
    gsap.from(".hero .btn", { duration: 1, y: -50, opacity: 0, delay: 0.9 });

    // Animation cho Review Cards (Trang Review)
    gsap.utils.toArray(".review-card").forEach(card => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            }
        });
    });

    // Animation cho Contact Info và Form (Trang Liên Hệ)
    gsap.utils.toArray(".contact-info, .contact-form").forEach(element => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            }
        });
    });

    // Hover effect cho tất cả nút
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseover', () => {
            gsap.to(btn, { scale: 1.1, duration: 0.3 });
        });
        btn.addEventListener('mouseout', () => {
            gsap.to(btn, { scale: 1, duration: 0.3 });
        });
    });

    // Lọc sản phẩm theo danh mục (Trang Sản Phẩm)
    const categoryFilter = document.querySelector('#category');
    const productCards = document.querySelectorAll('.product-card');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === "" || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Tìm kiếm sản phẩm (Trang Sản Phẩm)
    const searchInput = document.querySelector('#search');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchText = e.target.value.toLowerCase();

            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // JavaScript cho Dynamic Island
    const dynamicIsland = document.getElementById('dynamicIsland');
    const dynamicTitle = document.getElementById('dynamicTitle');
    const dynamicText = document.getElementById('dynamicText');
    const navLinks = document.querySelectorAll('.nav-link');

    if (dynamicIsland) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const title = link.getAttribute('data-title');
                localStorage.setItem('dynamicTitle', title);
                localStorage.setItem('isExpanded', 'true');
                dynamicTitle.textContent = title;
                dynamicIsland.classList.add('expanded');

                setTimeout(() => {
                    dynamicIsland.classList.remove('expanded');
                    localStorage.setItem('isExpanded', 'false');
                }, 1000);
            });
        });

        window.addEventListener('load', () => {
            const savedTitle = localStorage.getItem('dynamicTitle') || 'Trang Chủ';
            const isExpanded = localStorage.getItem('isExpanded') === 'true';

            dynamicTitle.textContent = savedTitle;
            dynamicText.textContent = 'MyShop';

            if (isExpanded) {
                dynamicIsland.classList.add('expanded');
                setTimeout(() => {
                    dynamicIsland.classList.remove('expanded');
                    localStorage.setItem('isExpanded', 'false');
                }, 1000);
            }
        });
    }

    // JavaScript cho popup (Trang Sản Phẩm)
    const infoSquares = document.querySelectorAll('.info-square');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closePopup = document.getElementById('closePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');

    if (infoSquares.length > 0) {
        infoSquares.forEach(square => {
            square.addEventListener('click', () => {
                const productCard = square.closest('.product-card');
                const title = productCard.querySelector('h3').textContent;
                const description = productCard.querySelector('.note').textContent;

                popupTitle.textContent = title;
                popupDescription.textContent = description;

                popup.style.display = 'block';
                overlay.style.display = 'block';
            });
        });

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Load saved theme
        window.addEventListener('load', () => {
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-theme');
            }
        });
    }
});