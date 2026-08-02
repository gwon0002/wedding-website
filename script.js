/**
 * Save the Date Wedding Website Script
 * Couples: Hyeokju Gwon (Jason) & Madison Marshall
 * Wedding Date: October 1, 2027
 */

// Immediate Guest Redirect Check (Executes before page finishes rendering)
(function() {
    const isLoginPage = window.location.pathname.endsWith('login.html');
    const isVerified = sessionStorage.getItem('wedding_verified') === 'true';

    if (isLoginPage) {
        if (isVerified) {
            window.location.href = 'index.html';
        }
    } else {
        if (!isVerified) {
            window.location.href = 'login.html';
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const isLoginPage = window.location.pathname.endsWith('login.html');
    if (isLoginPage) {
        document.body.classList.add('auth-page');
    } else {
        document.body.classList.add('verified');
    }

    // -----------------------------------------
    // 1. Language Translation Dictionary
    // -----------------------------------------
    const translations = {
        en: {
            saveTheDate: "SAVE THE DATE",
            jasonSub: "Jason",
            announcement: "FOR THE WEDDING OF",
            groom: "Hyeokju Gwon",
            bride: "Madison Marshall",
            date: "October 1, 2027",
            location: "Mechanicsburg, OH 43044",
            daysLabel: "Days",
            hoursLabel: "Hours",
            minsLabel: "Mins",
            secsLabel: "Secs",
            addCalendar: "Add to Calendar",
            viewMap: "View Map",
            googleMaps: "Google Maps",
            appleMaps: "Apple Maps",
            formalInvite: "Formal Invitation to Follow",
            googleCal: "Google Calendar",
            appleCal: "Apple Calendar (.ics)",
            outlookCal: "Outlook Calendar",
            calTitle: "Wedding of Hyeokju Gwon & Madison Marshall",
            calDesc: "Save the Date for Hyeokju Gwon (Jason) & Madison Marshall's wedding! Formal Invitation to Follow.",
            
            // Login Verification Translation Keys
            guestVerification: "GUEST VERIFICATION",
            loginAnnouncement: "WELCOME TO THE WEDDING WEBSITE OF HYEOKJU & MADISON",
            loginSubAnnouncement: "Please enter your name and phone number to access the website.",
            loginFirstName: "First Name",
            loginLastName: "Last Name",
            loginPhone: "Cell Phone Number",
            verifyButton: "Verify & Enter",
            verificationSuccess: "Verification successful! Welcome to our website.",
            verificationFailed: "Verification failed. Please check your spelling and phone number, or contact the couple."
        },
        ko: {
            saveTheDate: "날짜를 기억해 주세요",
            jasonSub: "",
            announcement: "저희 결혼합니다",
            groom: "권혁주",
            bride: "메디슨 마샬",
            date: "2027년 10월 1일",
            location: "미국 오하이오주 메카닉스버그 43044",
            daysLabel: "일",
            hoursLabel: "시간",
            minsLabel: "분",
            secsLabel: "초",
            addCalendar: "일정 추가",
            viewMap: "지도 보기",
            googleMaps: "구글 지도",
            appleMaps: "애플 지도",
            formalInvite: "정식 청첩장은 추후에 보내드릴 예정입니다",
            googleCal: "구글 캘린더",
            appleCal: "애플 캘린더 (.ics)",
            outlookCal: "아웃룩 캘린더",
            calTitle: "권혁주 & 메디슨 마샬 결혼식",
            calDesc: "권혁주 (Jason) & 메디슨 마샬의 결혼식 일정입니다. 추후 정식 청첩장을 보내드리겠습니다.",
            
            // Login Verification Translation Keys
            guestVerification: "하객 인증",
            loginAnnouncement: "권혁주 & 메디슨 마샬의 결혼식 웹사이트에 오신 것을 환영합니다",
            loginSubAnnouncement: "웹사이트에 접속하려면 이름과 전화번호를 입력해 주세요.",
            loginFirstName: "이름 (First Name)",
            loginLastName: "성 (Last Name)",
            loginPhone: "휴대폰 번호 (Phone)",
            verifyButton: "인증 및 입장하기",
            verificationSuccess: "인증에 성공했습니다! 웹사이트에 오신 것을 환영합니다.",
            verificationFailed: "인증에 실패했습니다. 이름 및 전화번호를 확인하시거나 신랑 신부에게 연락해 주세요."
        }
    };

    // Read language state from localStorage to persist language across page reloads
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // -----------------------------------------
    // 2. Countdown Timer Logic
    // -----------------------------------------
    const weddingDate = new Date(2027, 9, 1, 15, 30, 0).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference <= 0) {
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';

            const announcement = document.querySelector('.announcement');
            if (announcement) {
                announcement.innerText = currentLang === 'en' ? "THE HAPPY DAY HAS ARRIVED!" : "오늘 저희 결혼합니다!";
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    if (daysEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // -----------------------------------------
    // 3. Add to Calendar Dropdown
    // -----------------------------------------
    const btnCalendar = document.getElementById('btn-calendar');
    const calendarDropdown = document.getElementById('calendar-dropdown');

    if (btnCalendar && calendarDropdown) {
        btnCalendar.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close maps dropdown if open
            if (btnMaps && mapsDropdown) {
                btnMaps.setAttribute('aria-expanded', 'false');
                mapsDropdown.classList.remove('show');
            }

            const isExpanded = btnCalendar.getAttribute('aria-expanded') === 'true';
            btnCalendar.setAttribute('aria-expanded', !isExpanded);
            calendarDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            btnCalendar.setAttribute('aria-expanded', 'false');
            calendarDropdown.classList.remove('show');
        });
    }

    // -----------------------------------------
    // 3.5 Maps Dropdown
    // -----------------------------------------
    const btnMaps = document.getElementById('btn-maps');
    const mapsDropdown = document.getElementById('maps-dropdown');
    
    if (btnMaps && mapsDropdown) {
        btnMaps.addEventListener('click', (e) => {
            e.stopPropagation();

            // Close calendar dropdown if open
            if (btnCalendar && calendarDropdown) {
                btnCalendar.setAttribute('aria-expanded', 'false');
                calendarDropdown.classList.remove('show');
            }
    
            const isExpanded =
                btnMaps.getAttribute('aria-expanded') === 'true';
    
            btnMaps.setAttribute('aria-expanded', !isExpanded);
    
            mapsDropdown.classList.toggle('show');
        });
    
        document.addEventListener('click', () => {
            btnMaps.setAttribute('aria-expanded', 'false');
            mapsDropdown.classList.remove('show');
        });
    }

    // -----------------------------------------
    // 4. Calendar Link Generation (Language-aware)
    // -----------------------------------------
    const googleStart = '20271001T193000Z';
    const googleEnd = '20271002T010000Z';

    function updateCalendarLinks() {
        const title = translations[currentLang].calTitle;
        const desc = translations[currentLang].calDesc;
        const loc = translations[currentLang].location;

        // Google Calendar Link
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${googleStart}/${googleEnd}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
        const googleLink = document.getElementById('add-google');
        if (googleLink) {
            googleLink.href = googleUrl;
            googleLink.target = '_blank';
            googleLink.rel = 'noopener';
        }

        // Outlook Calendar Link
        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&startdt=2027-10-01T15:30:00-04:00&enddt=2027-10-01T21:00:00-04:00&body=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
        const outlookLink = document.getElementById('add-outlook');
        if (outlookLink) {
            outlookLink.href = outlookUrl;
            outlookLink.target = '_blank';
            outlookLink.rel = 'noopener';
        }
    }

    // Apple Calendar (.ics) Generation
    const appleLink = document.getElementById('add-apple');
    if (appleLink) {
        appleLink.addEventListener('click', (e) => {
            e.preventDefault();

            const title = translations[currentLang].calTitle;
            const desc = translations[currentLang].calDesc;
            const loc = translations[currentLang].location;

            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Hyeokju & Madison//Wedding Save The Date//EN',
                'BEGIN:VEVENT',
                'UID:wedding-hyeokju-madison-20271001',
                `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}`,
                `DTSTART:${googleStart}`,
                `DTEND:${googleEnd}`,
                `SUMMARY:${title}`,
                `DESCRIPTION:${desc}`,
                `LOCATION:${loc}`,
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const tempLink = document.createElement('a');
            tempLink.href = url;
            tempLink.setAttribute('download', `${currentLang === 'en' ? 'wedding-save-the-date' : '결혼식-일정-추가'}.ics`);
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(url);
        });
    }

    // -----------------------------------------
    // 5. Language Switching Logic with Smooth Cross-Fade
    // -----------------------------------------
    const btnEn = document.getElementById('lang-en');
    const btnKo = document.getElementById('lang-ko');
    const cardContentFade = document.getElementById('card-content-fade');

    function translateFormPlaceholders(lang) {
        const firstNameInput = document.getElementById('login-first-name');
        const lastNameInput = document.getElementById('login-last-name');
        const phoneInput = document.getElementById('login-phone');

        if (lang === 'ko') {
            if (firstNameInput) firstNameInput.placeholder = "예: 길동";
            if (lastNameInput) lastNameInput.placeholder = "예: 홍";
            if (phoneInput) phoneInput.placeholder = "예: 010-1234-5678";
        } else {
            if (firstNameInput) firstNameInput.placeholder = "e.g., John";
            if (lastNameInput) lastNameInput.placeholder = "e.g., Doe";
            if (phoneInput) phoneInput.placeholder = "e.g., (123) 456-7890";
        }
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update elements with [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const translationKey = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][translationKey]) {
                el.innerText = translations[currentLang][translationKey];
            }
        });

        // Localize form input placeholders
        translateFormPlaceholders(currentLang);

        // Update active classes on language buttons
        if (currentLang === 'en') {
            if (btnEn) btnEn.classList.add('active');
            if (btnKo) btnKo.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            if (btnKo) btnKo.classList.add('active');
            if (btnEn) btnEn.classList.remove('active');
            document.documentElement.lang = 'ko';
        }

        // Sync local components
        updateCalendarLinks();
        updateCountdown();
    }

    function switchLanguage(targetLang) {
        if (targetLang === currentLang) return;

        if (cardContentFade) {
            cardContentFade.classList.add('fade-out');
            setTimeout(() => {
                applyLanguage(targetLang);
                cardContentFade.classList.remove('fade-out');
            }, 250);
        } else {
            applyLanguage(targetLang);
        }
    }

    if (btnEn && btnKo) {
        btnEn.addEventListener('click', () => switchLanguage('en'));
        btnKo.addEventListener('click', () => switchLanguage('ko'));
    }

    // Apply translation on load
    applyLanguage(currentLang);

    // -----------------------------------------
    // 6. Guest Verification & Login Logic
    // -----------------------------------------

    // Guest Database - 52 registered guests
    const GUEST_DATABASE = [
        { firstName: "Hyeokju", lastName: "Gwon", phone: "123-456-7890" },
        { firstName: "Madison", lastName: "Marshall", phone: "098-765-4321" },
        { firstName: "Jason", lastName: "Gwon", phone: "111-222-3333" },
        { firstName: "Emma", lastName: "Smith", phone: "555-0101" },
        { firstName: "Liam", lastName: "Johnson", phone: "555-0102" },
        { firstName: "Olivia", lastName: "Williams", phone: "555-0103" },
        { firstName: "Noah", lastName: "Brown", phone: "555-0104" },
        { firstName: "Ava", lastName: "Jones", phone: "555-0105" },
        { firstName: "Oliver", lastName: "Garcia", phone: "555-0106" },
        { firstName: "Sophia", lastName: "Miller", phone: "555-0107" },
        { firstName: "Elijah", lastName: "Davis", phone: "555-0108" },
        { firstName: "Isabella", lastName: "Rodriguez", phone: "555-0109" },
        { firstName: "James", lastName: "Martinez", phone: "555-0110" },
        { firstName: "Charlotte", lastName: "Hernandez", phone: "555-0111" },
        { firstName: "Benjamin", lastName: "Lopez", phone: "555-0112" },
        { firstName: "Amelia", lastName: "Gonzalez", phone: "555-0113" },
        { firstName: "Lucas", lastName: "Wilson", phone: "555-0114" },
        { firstName: "Mia", lastName: "Anderson", phone: "555-0115" },
        { firstName: "Henry", lastName: "Thomas", phone: "555-0116" },
        { firstName: "Evelyn", lastName: "Taylor", phone: "555-0117" },
        { firstName: "Alexander", lastName: "Moore", phone: "555-0118" },
        { firstName: "Harper", lastName: "Jackson", phone: "555-0119" },
        { firstName: "Mason", lastName: "Martin", phone: "555-0120" },
        { firstName: "Camila", lastName: "Lee", phone: "555-0121" },
        { firstName: "Michael", lastName: "Perez", phone: "555-0122" },
        { firstName: "Gianna", lastName: "Thompson", phone: "555-0123" },
        { firstName: "Ethan", lastName: "White", phone: "555-0124" },
        { firstName: "Abigail", lastName: "Harris", phone: "555-0125" },
        { firstName: "Daniel", lastName: "Sanchez", phone: "555-0126" },
        { firstName: "Luna", lastName: "Clark", phone: "555-0127" },
        { firstName: "Jacob", lastName: "Ramirez", phone: "555-0128" },
        { firstName: "Ella", lastName: "Lewis", phone: "555-0129" },
        { firstName: "Logan", lastName: "Robinson", phone: "555-0130" },
        { firstName: "Elizabeth", lastName: "Walker", phone: "555-0131" },
        { firstName: "Jackson", lastName: "Young", phone: "555-0132" },
        { firstName: "Sofia", lastName: "Allen", phone: "555-0133" },
        { firstName: "Levi", lastName: "King", phone: "555-0134" },
        { firstName: "Avery", lastName: "Wright", phone: "555-0135" },
        { firstName: "Sebastian", lastName: "Scott", phone: "555-0136" },
        { firstName: "Scarlett", lastName: "Torres", phone: "555-0137" },
        { firstName: "Mateo", lastName: "Nguyen", phone: "555-0138" },
        { firstName: "Emily", lastName: "Hill", phone: "555-0139" },
        { firstName: "Jack", lastName: "Flores", phone: "555-0140" },
        { firstName: "Aria", lastName: "Green", phone: "555-0141" },
        { firstName: "Owen", lastName: "Adams", phone: "555-0142" },
        { firstName: "Penelope", lastName: "Nelson", phone: "555-0143" },
        { firstName: "Theodore", lastName: "Baker", phone: "555-0144" },
        { firstName: "Chloe", lastName: "Hall", phone: "555-0145" },
        { firstName: "Aiden", lastName: "Rivera", phone: "555-0146" },
        { firstName: "Layla", lastName: "Campbell", phone: "555-0147" },
        { firstName: "Grace", lastName: "Evans", phone: "555-0148" },
        { firstName: "Zoe", lastName: "Turner", phone: "555-0149" }
    ];

    // Helper functions for normalization
    function normalizeName(name) {
        return name.trim().toLowerCase().replace(/\s+/g, '');
    }

    // Keep only numeric characters
    function normalizePhone(phone) {
        return phone.replace(/\D/g, '');
    }

    function verifyGuest(first, last, ph) {
        const normFirst = normalizeName(first);
        const normLast = normalizeName(last);
        const normPhone = normalizePhone(ph);

        return GUEST_DATABASE.some(guest => {
            const matchFirst = normalizeName(guest.firstName) === normFirst;
            const matchLast = normalizeName(guest.lastName) === normLast;
            
            const guestPhone = normalizePhone(guest.phone);
            const matchPhone = guestPhone === normPhone || 
                               (guestPhone.length >= 7 && normPhone.endsWith(guestPhone)) ||
                               (normPhone.length >= 7 && guestPhone.endsWith(normPhone));

            return matchFirst && matchLast && matchPhone;
        });
    }

    // Login Form Handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('btn-login-submit');
            const spinner = submitBtn.querySelector('.spinner');
            const messageEl = document.getElementById('login-message');

            const firstName = document.getElementById('login-first-name').value;
            const lastName = document.getElementById('login-last-name').value;
            const phone = document.getElementById('login-phone').value;

            // Clear previous messages
            messageEl.classList.remove('show', 'success', 'error');
            messageEl.textContent = '';

            // Show loading state
            if (spinner) spinner.classList.remove('hide');
            submitBtn.disabled = true;

            // Premium loader timing transition (1.2 seconds)
            setTimeout(() => {
                const isValid = verifyGuest(firstName, lastName, phone);

                if (isValid) {
                    sessionStorage.setItem('wedding_verified', 'true');
                    
                    messageEl.classList.add('success', 'show');
                    messageEl.textContent = translations[currentLang].verificationSuccess;
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    if (spinner) spinner.classList.add('hide');
                    submitBtn.disabled = false;
                    
                    messageEl.classList.add('error', 'show');
                    messageEl.textContent = translations[currentLang].verificationFailed;
                }
            }, 1200);
        });
    }
});
