'use client'
import React, { useEffect } from 'react'

export default function changeClerk(classQuery) {
  useEffect(() => {
    // عند التحميل، تحقق مما إذا كان النص قد تم تغييره سابقًا
    const storedText = localStorage.getItem('modifiedText');
    
    const checkAndModifyElement = () => {
      const targetElement = document.querySelector(classQuery);
      
      if (targetElement) {
        // إذا كان النص قد تم تغييره مسبقًا، استخدم النص المخزن
        if (storedText) {
          targetElement.textContent = storedText;
        } else {
          // استخدم IntersectionObserver لمراقبة ظهور العنصر أمام المستخدم
          const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // إذا كان العنصر مرئيًا لأول مرة ولم يتم تغيير النص مسبقًا
                const newText = "Abazza Development";
                entry.target.textContent = newText;
                // قم بتخزين النص الجديد في localStorage
                localStorage.setItem('modifiedText', newText);

                // إيقاف المراقبة بعد تغيير النص
                intersectionObserver.unobserve(entry.target);
              }
            });
          });

          // ابدأ بمراقبة العنصر
          intersectionObserver.observe(targetElement);
        }
      }
    };

    // تابع التغييرات في DOM للبحث عن العنصر المطلوب
    const observer = new MutationObserver(() => {
      checkAndModifyElement(); // كلما حدثت تغييرات في DOM، تحقق من العنصر
    });

    // ابدأ بمراقبة DOM
    observer.observe(document.body, { childList: true, subtree: true });

    // تحقق من وجود العنصر عند التحميل لأول مرة
    checkAndModifyElement();
    // console.log('object');

    return () => {
      // تأكد من إيقاف المراقبة عند تدمير المكون
      observer.disconnect();
    };
  }, [classQuery]);
}
