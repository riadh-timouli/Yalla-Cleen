document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed - Yalla Clean Script Initializing...");
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  console.log("menuToggle element:", menuToggle);
  console.log("mainNav element:", mainNav);
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      console.log("Menu toggle clicked!");
      const isActive = mainNav.classList.toggle('active');
      console.log("mainNav classList after toggle:", mainNav.classList, "Is active:", isActive);
      
      menuToggle.setAttribute('aria-expanded', isActive.toString());
      const icon = menuToggle.querySelector('i');
      if (isActive) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        menuToggle.setAttribute('aria-label', 'إغلاق القائمة');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        menuToggle.setAttribute('aria-label', 'فتح القائمة');
      }
    });
    
    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          console.log("Nav link inside active menu clicked, closing menu.");
          mainNav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
          menuToggle.setAttribute('aria-label', 'فتح القائمة');
        }
      });
    });
  } else {
    console.error("Menu toggle button (.menu-toggle) or main navigation (.main-nav) not found in the DOM.");
  }
  
  // Sticky Header on Scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  } else {
    console.warn("Header element not found for sticky functionality.");
  }
  
  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && href !== "#") { // Ensure it's not just "#"
        const targetElement = document.querySelector(href);
        if (targetElement) { // Check if the target element exists
          e.preventDefault();
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          console.warn(`Smooth scroll target element with ID '${href}' not found.`);
        }
      }
    });
  });
  
  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLiAnchors = document.querySelectorAll('.main-nav ul li a');
  
  if (sections.length > 0 && navLiAnchors.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const headerHeight = header ? header.offsetHeight : 0;
      const scrollPosition = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 70; // Adjusted offset for better accuracy
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionId = section.getAttribute('id');
        }
      });
      
      // If scrolled to the very top, default to hero
      if (scrollPosition < (sections[0] ? sections[0].offsetTop - headerHeight - 70 : 200)) {
        currentSectionId = 'hero';
      }
      
      
      navLiAnchors.forEach(a => {
        a.classList.remove('active');
        const linkHref = a.getAttribute('href');
        if (linkHref && linkHref.substring(1) === currentSectionId) {
          a.classList.add('active');
        }
      });
      
      // Fallback: If no link is active, and we are at the top, make the first link active
      constisActiveLinkPresent = Array.from(navLiAnchors).some(a => a.classList.contains('active'));
      if (!isActiveLinkPresent && navLiAnchors[0] && navLiAnchors[0].getAttribute('href') === '#hero') {
        navLiAnchors[0].classList.add('active');
      }
    });
    // Trigger scroll event once on load to set initial active link
    window.dispatchEvent(new Event('scroll'));
  }
  
  
  // Update Copyright Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // Theme Toggle (Light/Dark Mode)
  const themeToggleButton = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;
  
  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
      if (themeToggleButton) themeToggleButton.setAttribute('aria-label', 'تبديل إلى الوضع النهاري');
      localStorage.setItem('yallaCleanTheme', 'dark');
      console.log("Theme set to Dark");
    } else { // 'light' or any other case
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
      if (themeToggleButton) themeToggleButton.setAttribute('aria-label', 'تبديل إلى الوضع الليلي');
      localStorage.setItem('yallaCleanTheme', 'light');
      console.log("Theme set to Light");
    }
  }
  
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      if (body.classList.contains('light-mode')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
    
    const savedTheme = localStorage.getItem('yallaCleanTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to light theme if no preference is saved
      setTheme('light');
    }
  } else {
    console.warn("Theme toggle button (#theme-toggle) not found.");
    // Ensure a default theme is applied if button is missing and no saved theme
    if (!localStorage.getItem('yallaCleanTheme')) {
      body.classList.add('light-mode');
    } else if (localStorage.getItem('yallaCleanTheme') === 'dark') {
      setTheme('dark'); // This will add dark-mode class
    } else {
      body.classList.add('light-mode'); // Default to light-mode
    }
  }
  
  // Swiper Slider Initialization for Results Gallery
  // تأكد من أن مكتبة Swiper مُضمّنة في HTML قبل هذا السكريبت
  if (typeof Swiper !== 'undefined' && document.querySelector('.results-slider')) {
    try {
      const resultsSlider = new Swiper('.results-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 25
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      });
      console.log("Swiper slider initialized.");
    } catch (error) {
      console.error("Error initializing Swiper slider:", error);
    }
  } else if (!document.querySelector('.results-slider')) {
    console.info("Swiper slider container (.results-slider) not found. Slider not initialized.");
  } else if (typeof Swiper === 'undefined') {
    console.error("Swiper library is not loaded. Slider not initialized.");
  }
  
  
  // Simple Animation on Scroll (Intersection Observer API)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ("IntersectionObserver" in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));
  } else if (animatedElements.length === 0) {
    console.info("No elements found with .animate-on-scroll class for Intersection Observer.");
  } else {
    // Fallback for older browsers or if IntersectionObserver is not supported
    console.warn("IntersectionObserver not supported, or no animated elements. Animations might not work as expected.");
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }
  
  console.log("Yalla Clean Script Fully Executed.");
});
// ... (الكود الموجود سابقًا) ...

// Services Page - Vehicle Type Price Updater
const vehicleTypeSelector = document.getElementById('vehicle-type');
const priceElements = document.querySelectorAll('.service-price .price');

function updateServicePrices() {
  if (!vehicleTypeSelector || priceElements.length === 0) return;
  
  const selectedType = vehicleTypeSelector.value; // sedan, suv, pickup, van
  
  priceElements.forEach(priceEl => {
    let priceValue = '';
    switch (selectedType) {
      case 'sedan':
        priceValue = priceEl.dataset.priceSedan;
        break;
      case 'suv':
        priceValue = priceEl.dataset.priceSuv;
        break;
      case 'pickup':
        priceValue = priceEl.dataset.pricePickup;
        break;
      case 'van':
        priceValue = priceEl.dataset.priceVan;
        break;
      default:
        priceValue = priceEl.dataset.priceSedan; // Default to sedan
    }
    
    if (priceValue) {
      priceEl.textContent = priceValue;
    } else {
      // Handle cases where price for a specific type might not be set
      // For now, show the default (sedan) or a placeholder
      const defaultPrice = priceEl.dataset.priceSedan || 'N/A';
      priceEl.textContent = defaultPrice;
    }
  });
}

if (vehicleTypeSelector) {
  vehicleTypeSelector.addEventListener('change', updateServicePrices);
  // Initial price update on page load
  updateServicePrices();
}

// ... (باقي كود script.js) ...

// ... (الكود الموجود سابقًا) ...

// Contact Form Handling (Frontend Only - for demonstration)
const contactForm = document.getElementById('contactForm');
const formStatusMessage = document.getElementById('form-status-message');

if (contactForm && formStatusMessage) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Basic client-side validation (you can add more)
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !subject || !message) {
      formStatusMessage.textContent = 'الرجاء ملء جميع الحقول المطلوبة.';
      formStatusMessage.className = 'form-status error'; // Add error class
      formStatusMessage.style.display = 'block';
      return;
    }
    
    // Simulate form submission
    formStatusMessage.textContent = 'جاري إرسال رسالتك...';
    formStatusMessage.className = 'form-status'; // Reset classes
    formStatusMessage.style.display = 'block';
    
    // --- IMPORTANT ---
    // In a real application, you would send the data to your server here using fetch() or XMLHttpRequest
    // For example:
    // const formData = new FormData(contactForm);
    // fetch(contactForm.action, {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json()) // Or response.text()
    // .then(data => {
    //     if (data.success) { // Assuming your server returns a JSON with a success flag
    //         formStatusMessage.textContent = 'شكراً لك! تم إرسال رسالتك بنجاح.';
    //         formStatusMessage.className = 'form-status success';
    //         contactForm.reset(); // Clear the form
    //     } else {
    //         formStatusMessage.textContent = 'حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.';
    //         formStatusMessage.className = 'form-status error';
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     formStatusMessage.textContent = 'حدث خطأ في الشبكة. الرجاء التحقق من اتصالك والمحاولة مرة أخرى.';
    //     formStatusMessage.className = 'form-status error';
    // });
    // --- END OF SERVER-SIDE SUBMISSION EXAMPLE ---
    
    // For this frontend-only demo, we'll just show a success message after a delay
    setTimeout(() => {
      formStatusMessage.textContent = 'شكراً لك! تم إرسال رسالتك بنجاح (محاكاة).';
      formStatusMessage.className = 'form-status success';
      contactForm.reset(); // Clear the form
    }, 2000); // Simulate 2 seconds delay
  });
}

// ... (باقي كود script.js) ...

// ... (الكود الموجود سابقًا لـ Mobile Menu, Theme Toggle, Sticky Header, etc.) ...

    // --- Booking Page Specific Logic ---
    // Ensure this runs only on the booking page, or check for element existence
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        console.log("Booking page script initializing...");

        const selectedServiceInfoDiv = document.getElementById('selectedServiceInfo');
        const vehicleTypeBookingSelect = document.getElementById('vehicleTypeBooking');
        const additionalServicesCheckboxesDiv = document.getElementById('additionalServicesCheckboxes');
        const baseServiceNameSpan = document.getElementById('baseServiceName');
        const baseServicePriceSpan = document.getElementById('baseServicePrice');
        const vehicleTypeNameSpan = document.getElementById('vehicleTypeName');
        const addonsSummaryDiv = document.getElementById('addonsSummary');
        const selectedAddonsListUl = document.getElementById('selectedAddonsList');
        const totalBookingPriceSpan = document.getElementById('totalBookingPrice');
        const bookingFormStatusDiv = document.getElementById('bookingFormStatus');

        // --- Mock Service Data (Replace with actual data source or logic) ---
        const servicesData = {
            express_wash: { 
                name: "غسيل خارجي إكسبرس", 
                prices: { sedan: 1000, suv: 1200, pickup: 1500, van: 1800 } 
            },
            basic_full_wash: { 
                name: "غسيل داخلي وخارجي (أساسي)", 
                prices: { sedan: 2000, suv: 2500, pickup: 3000, van: 3500 } 
            },
            vip_wash: { 
                name: "غسيل VIP (متكامل وعميق)", 
                prices: { sedan: 3500, suv: 4500, pickup: 5500, van: 6500 } 
            },
            // Add other main services from services.html here with their prices
            // e.g., oil_change, interior_deep_clean, etc.
        };

        const addonsData = [
            { id: "polish", name: "تلميع الهيكل (واكس)", price: 500 },
            { id: "engine_clean", name: "تنظيف المحرك", price: 800 },
            { id: "ac_sanitize", name: "تعقيم المكيف", price: 600 },
            { id: "seat_clean_fabric", name: "تنظيف مقاعد القماش", price: 1500 },
            { id: "seat_clean_leather", name: "تنظيف مقاعد الجلد", price: 2000 }
        ];
        // --- End of Mock Service Data ---

        let currentServiceId = null;
        let currentVehicleType = 'sedan'; // Default
        let currentBasePrice = 0;

        // Function to get URL parameters
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }

        // Populate available additional services checkboxes
        function populateAddons() {
            if (!additionalServicesCheckboxesDiv) return;
            additionalServicesCheckboxesDiv.innerHTML = ''; // Clear existing
            addonsData.forEach(addon => {
                const label = document.createElement('label');
                label.className = 'checkbox-label';
                label.innerHTML = `<input type="checkbox" name="addons[]" value="${addon.id}" data-addon-price="${addon.price}"> ${addon.name} (+<span class="addon-price">${addon.price}</span> دج)`;
                additionalServicesCheckboxesDiv.appendChild(label);
            });
            // Add event listeners to new checkboxes for price calculation
            document.querySelectorAll('#additionalServicesCheckboxes input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', calculateTotalPrice);
            });
        }


        // Load selected service and vehicle from URL parameters
        function loadServiceFromUrl() {
            currentServiceId = getUrlParameter('service');
            const vehicleFromUrl = getUrlParameter('vehicle');

            if (vehicleFromUrl && vehicleTypeBookingSelect) {
                vehicleTypeBookingSelect.value = vehicleFromUrl;
                currentVehicleType = vehicleFromUrl;
            }

            if (currentServiceId && servicesData[currentServiceId]) {
                const service = servicesData[currentServiceId];
                if (selectedServiceInfoDiv) {
                    selectedServiceInfoDiv.innerHTML = `
                        <h4>الخدمة المختارة: ${service.name}</h4>
                        <p>لقد اخترت هذه الخدمة من صفحة الخدمات. يمكنك تعديل نوع السيارة أو إضافة خدمات أخرى أدناه.</p>
                    `;
                }
                if (baseServiceNameSpan) baseServiceNameSpan.textContent = service.name;
            } else {
                if (selectedServiceInfoDiv) {
                    selectedServiceInfoDiv.innerHTML = `
                        <h4>لم يتم تحديد خدمة أساسية</h4>
                        <p>يرجى <a href="services.html">اختيار خدمة من صفحة الخدمات</a> أو يمكنك المتابعة واختيار التفاصيل أدناه (قد يتم تحديد خدمة افتراضية).</p>
                    `;
                    // Optionally, set a default service if none is passed
                    currentServiceId = 'basic_full_wash'; // Example default
                    if (baseServiceNameSpan && servicesData[currentServiceId]) baseServiceNameSpan.textContent = servicesData[currentServiceId].name;
                }
                 if (baseServiceNameSpan) baseServiceNameSpan.textContent = "يرجى اختيار خدمة";
            }
            calculateTotalPrice(); // Initial calculation
        }

        // Calculate and update total price
        function calculateTotalPrice() {
            if (!servicesData[currentServiceId] || !vehicleTypeBookingSelect) {
                if (totalBookingPriceSpan) totalBookingPriceSpan.textContent = "N/A";
                return;
            }

            currentVehicleType = vehicleTypeBookingSelect.value;
            const service = servicesData[currentServiceId];
            currentBasePrice = service.prices[currentVehicleType] || service.prices['sedan']; // Fallback to sedan price

            if (baseServicePriceSpan) baseServicePriceSpan.textContent = currentBasePrice;
            if (vehicleTypeNameSpan) vehicleTypeNameSpan.textContent = vehicleTypeBookingSelect.options[vehicleTypeBookingSelect.selectedIndex].text;

            let addonsPrice = 0;
            let selectedAddonsHtml = '';
            document.querySelectorAll('#additionalServicesCheckboxes input[type="checkbox"]:checked').forEach(checkbox => {
                const price = parseFloat(checkbox.dataset.addonPrice);
                if (!isNaN(price)) {
                    addonsPrice += price;
                    const addonName = checkbox.parentElement.textContent.split('(+')[0].trim(); // Get addon name
                    selectedAddonsHtml += `<li>${addonName} - ${price} دج</li>`;
                }
            });

            if (selectedAddonsListUl) {
                if (selectedAddonsHtml) {
                    selectedAddonsListUl.innerHTML = selectedAddonsHtml;
                } else {
                    selectedAddonsListUl.innerHTML = '<li>لا توجد خدمات إضافية مختارة</li>';
                }
            }
            

            const totalPrice = currentBasePrice + addonsPrice;
            if (totalBookingPriceSpan) totalBookingPriceSpan.textContent = totalPrice;
        }

        // Event listeners
        if (vehicleTypeBookingSelect) {
            vehicleTypeBookingSelect.addEventListener('change', calculateTotalPrice);
        }
        
        // Flatpickr Initialization for Date/Time
        const bookingDateTimeField = document.getElementById('bookingDateTime');
        if (bookingDateTimeField) {
            flatpickr(bookingDateTimeField, {
                enableTime: true,
                dateFormat: "Y-m-d H:i", // السنة-الشهر-اليوم الساعة:الدقيقة
                minDate: "today",
                minuteIncrement: 30, // كل نصف ساعة
                locale: "ar", // Arabic localization
                time_24hr: false, // Use 12-hour format with AM/PM
                "disable": [
                    function(date) {
                        // Disable Fridays
                        return (date.getDay() === 5); 
                    }
                ],
                // You can add more complex logic for available time slots here
                // For example, based on existing bookings from a backend.
            });
        }

        // Booking Form Submission (Frontend Only Simulation)
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (bookingFormStatusDiv) {
                bookingFormStatusDiv.textContent = 'جاري إرسال الحجز...';
                bookingFormStatusDiv.className = 'form-status';
                bookingFormStatusDiv.style.display = 'block';
            }

            // --- IMPORTANT: Real submission to server would go here ---
            // const formData = new FormData(bookingForm);
            // console.log("Form data to be sent:", Object.fromEntries(formData.entries()));
            // fetch(bookingForm.action, { method: 'POST', body: formData })
            // .then(response => response.json())
            // .then(data => { /* ... handle success/error ... */ })
            // .catch(error => { /* ... handle network error ... */ });
            // ---

            setTimeout(() => {
                if (bookingFormStatusDiv) {
                    bookingFormStatusDiv.textContent = 'تم تأكيد حجزك بنجاح! سنتواصل معك قريباً (محاكاة).';
                    bookingFormStatusDiv.className = 'form-status success';
                }
                bookingForm.reset(); // Reset the form fields
                loadServiceFromUrl(); // Recalculate price for a new booking
            }, 2500);
        });

        // Initialize page
        populateAddons();
        loadServiceFromUrl();

    } // End of if (bookingForm)

    // --- Google Maps Initialization for Booking Page ---
    // This function is called by the Google Maps API script tag (callback=initBookingPageMap)
    window.initBookingPageMap = function() {
        const mapDiv = document.getElementById('mapBooking');
        if (!mapDiv) {
            console.log("Map container for booking not found.");
            return;
        }

        // Default location (e.g., Algiers)
        const defaultLat = 36.7753; 
        const defaultLng = 3.0588;

        const map = new google.maps.Map(mapDiv, {
            center: { lat: defaultLat, lng: defaultLng },
            zoom: 11, // Zoom out a bit to show a wider area initially
            mapTypeControl: false,
            streetViewControl: false,
        });

        let marker = new google.maps.Marker({
            position: { lat: defaultLat, lng: defaultLng },
            map: map,
            draggable: true,
            title: "موقعك (اسحب العلامة لتغيير الموقع)"
        });

        // Update hidden lat/lng fields when marker is dragged
        google.maps.event.addListener(marker, 'dragend', function(event) {
            document.getElementById('customerLatitude').value = event.latLng.lat();
            document.getElementById('customerLongitude').value = event.latLng.lng();
            console.log("Marker dragged to:", event.latLng.lat(), event.latLng.lng());
        });

        // Optional: Add a search box to the map
        const input = document.createElement('input');
        input.setAttribute('id', 'pac-input-booking');
        input.setAttribute('class', 'controls map-search-box'); // You'll need to style .map-search-box
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'ابحث عن عنوانك هنا...');
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

        const searchBox = new google.maps.places.SearchBox(input);
        map.addListener('bounds_changed', () => {
            searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            const place = places[0];
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            map.setCenter(place.geometry.location);
            map.setZoom(16); // Zoom in on searched location
            marker.setPosition(place.geometry.location);
            document.getElementById('customerLatitude').value = place.geometry.location.lat();
            document.getElementById('customerLongitude').value = place.geometry.location.lng();
            // Optionally, fill the address field
            // document.getElementById('customerAddress').value = place.formatted_address || input.value;
            console.log("Location selected via search:", place.geometry.location.lat(), place.geometry.location.lng());

        });
        
        // Set initial marker position to hidden fields if they have values (e.g., from a previous attempt)
        // Or try to get user's current location (with permission)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    marker.setPosition(userPos);
                    map.setCenter(userPos);
                    map.setZoom(16);
                    document.getElementById('customerLatitude').value = userPos.lat;
                    document.getElementById('customerLongitude').value = userPos.lng;
                    console.log("User geolocation:", userPos.lat, userPos.lng);
                },
                () => {
                    console.log("Error: The Geolocation service failed or permission denied. Using default.");
                    // Set initial values for hidden fields to default if geolocation fails
                    document.getElementById('customerLatitude').value = defaultLat;
                    document.getElementById('customerLongitude').value = defaultLng;
                }
            );
        } else {
            // Browser doesn't support Geolocation
            console.log("Error: Your browser doesn't support geolocation. Using default.");
            document.getElementById('customerLatitude').value = defaultLat;
            document.getElementById('customerLongitude').value = defaultLng;
        }
         // Set initial hidden fields based on marker's initial position
        document.getElementById('customerLatitude').value = marker.getPosition().lat();
        document.getElementById('customerLongitude').value = marker.getPosition().lng();

        console.log("Booking page map initialized.");
    } // End of initBookingPageMap


// ... (باقي كود script.js) ...

// ... (الكود الموجود سابقًا لـ Mobile Menu, Theme Toggle, Booking Page, etc.) ...

// --- document.addEventListener('DOMContentLoaded', function() {
  // ... (الكود الموجود سابقًا لـ Mobile Menu, Theme Toggle, Booking Page, etc.) ...
  
  // --- Privacy Policy Popup Logic (Modified for Click Trigger) ---
  const privacyPopup = document.getElementById('privacyPopup');
  const closePrivacyPopupButton = document.getElementById('closePrivacyPopup');
  const privacyTextContainer = document.getElementById('privacyTextContainer');
  const privacyCheckbox = document.getElementById('privacyCheckbox');
  const acceptPrivacyButton = document.getElementById('acceptPrivacyBtn');
  
  // الروابط التي ستفتح النافذة المنبثقة
  const openPrivacyPopupLinks = document.querySelectorAll('#openPrivacyPopupHeader, #openPrivacyPopupFooter');
  
  // const PRIVACY_ACCEPTED_KEY = 'yallaCleanPrivacyAccepted'; // قد لا نعود بحاجة لهذا إذا كانت تظهر عند كل نقرة
  
  function showPrivacyPopup() {
    if (privacyPopup) {
      privacyPopup.style.display = 'flex';
      setTimeout(() => {
        privacyPopup.classList.add('visible');
      }, 10);
      document.body.style.overflow = 'hidden';
      
      // إعادة تعيين حالة النافذة عند كل فتح
      if (privacyCheckbox) privacyCheckbox.checked = false;
      if (privacyCheckbox) privacyCheckbox.disabled = true; // ابدأها معطلة حتى يتم التمرير
      if (acceptPrivacyButton) acceptPrivacyButton.disabled = true;
      if (privacyTextContainer) privacyTextContainer.scrollTop = 0; // ابدأ التمرير من الأعلى
      checkScrollBottom(); // تحقق من حالة التمرير الأولية
      console.log("Privacy popup shown.");
    }
  }
  
  function hidePrivacyPopup() {
    if (privacyPopup) {
      privacyPopup.classList.remove('visible');
      setTimeout(() => {
        privacyPopup.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
      console.log("Privacy popup hidden.");
    }
  }
  
  function checkScrollBottom() {
    if (privacyTextContainer && privacyCheckbox && acceptPrivacyButton) {
      const scrollReachedBottom = privacyTextContainer.scrollHeight - privacyTextContainer.scrollTop <= privacyTextContainer.clientHeight + 15; // زيادة السماحية قليلاً
      
      if (scrollReachedBottom) {
        privacyCheckbox.disabled = false;
        console.log("Scrolled to bottom, checkbox enabled.");
      } else {
        privacyCheckbox.disabled = true;
        privacyCheckbox.checked = false; // إلغاء التحديد إذا لم يعد في الأسفل
        acceptPrivacyButton.disabled = true; // تعطيل زر الموافقة إذا لم يكن مربع الاختيار محددًا
      }
      // تحديث حالة زر الموافقة بناءً على مربع الاختيار (حتى لو تم تمكين مربع الاختيار يدويًا)
      acceptPrivacyButton.disabled = !privacyCheckbox.checked;
    }
  }
  
  if (privacyPopup && closePrivacyPopupButton && privacyTextContainer && privacyCheckbox && acceptPrivacyButton) {
    
    // إضافة مستمعي الأحداث لروابط فتح النافذة
    openPrivacyPopupLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // منع سلوك الرابط الافتراضي
        showPrivacyPopup();
      });
    });
    
    closePrivacyPopupButton.addEventListener('click', hidePrivacyPopup);
    
    privacyCheckbox.addEventListener('change', function() {
      if (acceptPrivacyButton) {
        // لا يتم تفعيل زر الموافقة إلا إذا كان مربع الاختيار مفعلاً (أي تم التمرير) ومحددًا
        acceptPrivacyButton.disabled = !(this.checked && !this.disabled);
      }
    });
    
    privacyTextContainer.addEventListener('scroll', checkScrollBottom);
    
    acceptPrivacyButton.addEventListener('click', function() {
      if (privacyCheckbox.checked && !privacyCheckbox.disabled) {
        // localStorage.setItem(PRIVACY_ACCEPTED_KEY, 'true'); // اختياري: إذا كنت لا تزال تريد حفظ الموافقة لسبب ما
        hidePrivacyPopup();
        console.log("Privacy policy accepted via click.");
        // يمكنك هنا القيام بأي إجراء آخر بعد الموافقة، مثل تمكين زر آخر أو ما شابه
      }
    });
    
    privacyPopup.addEventListener('click', function(event) {
      if (event.target === privacyPopup) {
        hidePrivacyPopup();
      }
    });
    
  } else {
    let missingElements = [];
    if (!privacyPopup) missingElements.push("#privacyPopup");
    if (!closePrivacyPopupButton) missingElements.push("#closePrivacyPopup");
    // ... وهكذا لباقي العناصر
    console.warn(`One or more privacy popup elements not found. Missing: ${missingElements.join(', ')}. Popup functionality might be affected.`);
  }
// ... (باقي كود script.js) ...
// ... (الكود الموجود سابقًا لـ Mobile Menu, Theme Toggle, Booking, Privacy Popup, etc.) ...

// --- FAQ Page Accordion Logic ---
const faqItems = document.querySelectorAll('.faq-item .faq-question');

if (faqItems.length > 0) {
  faqItems.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement; // .faq-item
      const answer = button.nextElementSibling; // .faq-answer
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all other open FAQs in the same category (optional)
      // const category = item.closest('.faq-category');
      // if (category) {
      //     category.querySelectorAll('.faq-item .faq-question[aria-expanded="true"]').forEach(openButton => {
      //         if (openButton !== button) {
      //             openButton.setAttribute('aria-expanded', 'false');
      //             openButton.nextElementSibling.style.maxHeight = null;
      //             openButton.nextElementSibling.style.paddingTop = '0';
      //             openButton.nextElementSibling.style.paddingBottom = '0';
      //         }
      //     });
      // }
      
      // Toggle current FAQ
      button.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        // To open: set max-height to its scrollHeight for smooth transition
        answer.style.maxHeight = answer.scrollHeight + "px";
        // The padding transition is handled by the CSS class change
      } else {
        // To close: set max-height to null (or 0)
        answer.style.maxHeight = null;
      }
    });
  });
}

// --- Ask a Question Form Handling (Frontend Only - similar to contact form) ---
const askQuestionForm = document.getElementById('askQuestionForm');
const askFormStatusMessage = document.getElementById('askFormStatusMessage');

if (askQuestionForm && askFormStatusMessage) {
  askQuestionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const email = document.getElementById('ask-email').value.trim();
    const questionText = document.getElementById('ask-question-text').value.trim();
    
    if (!email || !questionText) {
      askFormStatusMessage.textContent = 'الرجاء ملء حقلي البريد الإلكتروني والسؤال.';
      askFormStatusMessage.className = 'form-status error';
      askFormStatusMessage.style.display = 'block';
      return;
    }
    
    askFormStatusMessage.textContent = 'جاري إرسال سؤالك...';
    askFormStatusMessage.className = 'form-status';
    askFormStatusMessage.style.display = 'block';
    
    // --- IMPORTANT: Real submission to server would go here ---
    // const formData = new FormData(askQuestionForm);
    // fetch(askQuestionForm.action, { method: 'POST', body: formData })
    // .then(response => response.json()) // Or response.text()
    // .then(data => {
    //     if (data.success) {
    //         askFormStatusMessage.textContent = 'شكراً لك! تم إرسال سؤالك بنجاح.';
    //         askFormStatusMessage.className = 'form-status success';
    //         askQuestionForm.reset(); 
    //     } else {
    //         askFormStatusMessage.textContent = 'حدث خطأ أثناء إرسال السؤال. الرجاء المحاولة مرة أخرى.';
    //         askFormStatusMessage.className = 'form-status error';
    //     }
    // })
    // .catch(error => { /* ... handle network error ... */ });
    // ---
    
    // For this frontend-only demo:
    setTimeout(() => {
      askFormStatusMessage.textContent = 'شكراً لك! تم إرسال سؤالك بنجاح (محاكاة). سنتواصل معك قريباً إذا لزم الأمر.';
      askFormStatusMessage.className = 'form-status success';
      askQuestionForm.reset();
    }, 2000);
  });
}

// ... (باقي كود script.js) ...