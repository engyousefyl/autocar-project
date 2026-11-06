$(document).ready(function () {

    $(".details").hide();
    $("#bookingForm").hide();

    $(".show-details").click(function () {
        $(this).parent().find(".details").toggle();
    });

    

    $("#proceedBtn").click(function () {
        var selected = $("input[name='selected-car']:checked");
        if (selected.length === 0) {
            alert("الرجاء اختيار سيارة واحدة على الأقل من الجدول.");
            return;
        }
        $("#bookingForm").show();
    });

    $("#bookingForm").submit(function (event) {
        event.preventDefault();
        
        var name = $("#fullName").val().trim();
        var nid = $("#nationalId").val().trim();
        var start = $("#startDate").val();
        var end = $("#endDate").val();
        var mob = $("#mobile").val().trim();
        var mail = $("#email").val().trim();
        var selected = $("input[name='selected-car']:checked");

        if (selected.length === 0) return alert("الرجاء اختيار سيارة واحدة على الأقل.");
        if (!name || !/^[\u0621-\u064A\s]+$/.test(name)) return alert("الاسم إلزامي ويجب أن يحتوي على أحرف عربية فقط.");
        if (!/^(0[1-9]|1[0-4])[0-9]{9}$/.test(nid)) return alert("الرقم الوطني إلزامي (11 رقماً ويبدأ من 01 إلى 14).");
        if (!start || !end) return alert("تاريخا البداية والنهاية إلزاميان.");
        
        var first = Date.parse(start + "T00:00:00Z");
        var last = Date.parse(end + "T00:00:00Z");
        if (last <= first) return alert("تاريخ النهاية يجب أن يكون بعد تاريخ البداية.");
        if (!/^09[3-9][0-9]{7}$/.test(mob)) return alert("رقم الموبايل إلزامي ويجب أن يطابق الصيغة المحددة.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return alert("البريد الإلكتروني إلزامي ويجب أن يكون صحيحاً.");

        var days = (last - first) / (1000 * 60 * 60 * 24);
        var dailyPricePerCar = 250000;
        var carCount = selected.length; 
        
    
        var total = days * dailyPricePerCar * carCount;
        var discount = days > 7 ? total * 0.10 : 0;
        var finalAmount = total - discount;

   
        var carNames = [];
        selected.each(function () {
            var cName = $(this).closest("tr").find("td").eq(2).text();
            carNames.push(cName);
        });

        alert("السيارات المختارة:\n- " + carNames.join("\n- ") + "\n\n" +
              "عدد السيارات: " + carCount + "\n" +
              "عدد أيام التأجير: " + days + " يوم\n" +
              "المجموع: " + total.toLocaleString() + " ل.س\n" +
              "الخصم: " + discount.toLocaleString() + " ل.س\n" +
              "المبلغ النهائي: " + finalAmount.toLocaleString() + " ل.س");
    });
});