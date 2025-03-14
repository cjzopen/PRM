<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // $input = htmlspecialchars(stripslashes($_POST['number']), ENT_QUOTES) ?? ''; // PHP 5.6 看不懂 {??}
  $input = @htmlspecialchars(stripslashes(isset($_POST['number']) ? $_POST['number'] : ''), ENT_QUOTES);
  if (!empty($input)) {
    $fileType = 'json'; // 'txt' 或 'json'
    $fileIndex = intval(substr($input, -2)) % 20; // 使用工號的最後2位數決定文件索引，分成20個檔案
    $fileName = 'output_' . $fileIndex . '.' . $fileType;
    // $filePath = __DIR__ . '/' . $fileName;
    $filePath = './data1/' . $fileName;

    if ($fileType === 'json') {
      $data = [];
      $exists = false;
      $hashTable = [];
          
      // 如果檔案已存在，讀取並解析
      if (file_exists($filePath)) {
        $existingData = file_get_contents($filePath);
        // $data = json_decode($existingData, true) ?? []; // PHP 5.6 看不懂 {??}
        $data = json_decode($existingData, true);
        if ($data === null) {
          $data = [];
        }

        // 將工號存進hashtable
        foreach ($data as $entry) {
          $hashTable[$entry['工號']] = true;
        }

        // 檢查是否已經存在相同的工號
        if (isset($hashTable[$input])) {
          $exists = true;
        }
      }

      if (!$exists) {
        // 新增輸入資料
        $data[] = ['工號' => $input, 'timestamp' => date('Y-m-d H:i:s')];

        // 將更新後的數據寫回檔案
        $result = file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        if ($result !== false) {
          // echo "資料已更新！";
          echo "success";
        } else {
          error_log("檔案更新失敗：無法寫入文件 $filePath");
          // echo "檔案更新失敗！";
          echo "fail";
        }
      } else {
        // echo "工號已存在，未新增資料！";
        echo "success";
      }
    } else {
      // TXT 檔案處理，追加新資料
      $newEntry = "工號: $input | Timestamp: " . date('Y-m-d H:i:s') . PHP_EOL;
      $result = file_put_contents($filePath, $newEntry, FILE_APPEND);
      if ($result !== false) {
        echo "資料已更新！";
      } else {
        error_log("檔案更新失敗：無法寫入文件 $filePath");
        echo "檔案更新失敗！";
      }
    }
  } else {
    echo "無效的輸入資料！";
  }
} else {
  // echo "無效的請求方法！";
}
?>
