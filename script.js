/**
 * Save the Date Wedding Website Script
 * Couples: Hyeokju Gwon (Jason) & Madison Marshall
 * Wedding Date: October 1, 2027
 */

document.addEventListener('DOMContentLoaded', () => {
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
            calDesc: "Save the Date for Hyeokju Gwon (Jason) & Madison Marshall's wedding! Formal Invitation to Follow."
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
            calDesc: "권혁주 (Jason) & 메디슨 마샬의 결혼식 일정입니다. 추후 정식 청첩장을 보내드리겠습니다."
        }
    };

    let currentLang = 'en';

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

    updateCountdown();
    setInterval(updateCountdown, 1000);

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
    const rawLoc = 'Mechanicsburg, OH 43044';

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

    // Initial sync
    updateCalendarLinks();

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

    function switchLanguage(targetLang) {
        if (targetLang === currentLang || !cardContentFade) return;

        // Step 5a: Trigger smooth opacity fade-out
        cardContentFade.classList.add('fade-out');

        // Wait 250ms for fade-out to complete
        setTimeout(() => {
            currentLang = targetLang;

            // Step 5b: Loop and translate elements in DOM
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const translationKey = el.getAttribute('data-i18n');
                if (translations[currentLang][translationKey]) {
                    el.innerText = translations[currentLang][translationKey];
                }
            });

            // Step 5c: Update active classes on language buttons
            if (currentLang === 'en') {
                btnEn.classList.add('active');
                btnKo.classList.remove('active');
                document.documentElement.lang = 'en';
            } else {
                btnKo.classList.add('active');
                btnEn.classList.remove('active');
                document.documentElement.lang = 'ko';
            }

            // Step 5d: Update dynamic calendar links to match active language
            updateCalendarLinks();

            // Step 5e: Update countdown subtitle text if event has passed
            updateCountdown();

            // Step 5f: Fade content back in
            cardContentFade.classList.remove('fade-out');
        }, 250);
    }

    if (btnEn && btnKo) {
        btnEn.addEventListener('click', () => switchLanguage('en'));
        btnKo.addEventListener('click', () => switchLanguage('ko'));
    }
});
