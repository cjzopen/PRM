# PRM
尾牙活動時登入工號並記錄的頁面。
## 前端畫面
### index.html
* 沒有form，所以不是submit事件，而是click事件。
* 判斷input為五個數字後，觸發.start點擊事件後歌詞出現。

## 傳值到後端
### post.php
* 判斷值的後2碼生成data1/output_n.json並更新進去（n=值的後2碼 % 20）。若認為分流還不夠可以自行增加，測試完記得把生成的json檔刪除。
* 更新成功回傳：success。
* 發現已有相同工號在json檔中回傳：success。
* 更新失敗回傳：fail。
* dl.html可結合所有json產生csv檔，若要改寫格式請直接改dl.html。

## 前端呼叫後端的機制
### js/event.js
* 輸入工號成功後，使用localStorage避免refresh後再次輸入同樣的工號呼叫後端（使用者看不出來，一樣會顯示歌詞）。
* 輸入工號成功後，若後端回傳success則不再做任何事。
* 輸入工號成功後，若後端回傳fail則5秒內再傳一次值（使用者看不出來）。

> 活動結束後請把post.php產生json檔的功能註解掉，csv下載完後請把dl.html處理掉，避免不必要的風險。
