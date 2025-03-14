let savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
let existingNumbers = [];
let retryTimes = 0;

// 獲取已經存在的工號
// async function fetchExistingNumbers() {
//   const res = await fetch('output.json');
//   const data = await res.json();
//   existingNumbers = data.map(entry => entry['工號']);
// }
// fetchExistingNumbers();

// 上傳工號
async function uploadNumber(number) {
  try {
    const response = await $.post('post.php', { number: number });
    console.log(response);
    if (response === 'success') {
      // 成功上傳
      savedNumbers.push(number);
      localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
    } else if (response === 'fail') {
      // 0.1 到 5 秒後重試
      const retryDelay = Math.floor(Math.random() * 5000) + 100;
      retryTimes++;
      setTimeout(function() {
        uploadNumber(number);
        console.log('retryTimes:', retryTimes);
      }, retryDelay);
    } else {
      console.log('unknown response:', response);
    }
  } catch (error) {
    console.log(error.responseText);
  }
}

$('.btn-wrap').click(function() {
	const inputVal = $('#numberInput').val().toString();
  // 移除所有按鈕的 CSS
  $(this).removeClass('warn start');
                
  // 判斷輸入的數字長度
  if (inputVal.length === 5 && /^\d+$/.test(inputVal)) {
		$(this).addClass('start'); 
	} else {
		$(".text-remind").show(); 
    $(this).addClass('warn');
	}
});
$('#numberInput').on('input', function() {
  const inputVal = $(this).val().toString();

  // 檢查輸入是否為 5 個數字
  if (/^\d{5}$/.test(inputVal)) {
    $('.btn-wrap').addClass('start').prop('disabled', false);
		$('.start').click(function() {

      // Check local storage for duplicate
      if (savedNumbers.includes(inputVal)) {
        console.log('blocked by browser storage');
      } else {
        // fetchExistingNumbers();
        if (existingNumbers.includes(inputVal)) {
          console.log('blocked by existing numbers');
          savedNumbers.push(inputVal);
          localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
        } 
        // else if (!/^\d{5}$/.test(inputVal)) {
        //   // 檢查是否為五個數字
        //   alert('工號必須是五個數字');
        // } 
        else {
          // 上傳
          uploadNumber(inputVal);
        }
      }
      $('.btn-page').fadeOut(500);
        setTimeout(function() {
				$('.song-page').fadeIn(1000);
			}, 550); 
    });
  } else {
//                    $('.btn-wrap').removeClass('active').prop('disabled', true);
  }
});

// -------------- 滑到內容才顯現------------------
wow = new WOW(
    {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    }
  )
wow.init();
