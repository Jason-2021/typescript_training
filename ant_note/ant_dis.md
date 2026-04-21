1. 佈局與柵格系統 (Layout & Grid)
這是決定網頁「骨架」的第一步。AntD 的佈局邏輯非常強大：

    - Layout 組件： 掌握 Header, Sider, Content, Footer 的嵌套結構。這能讓你一秒做出側邊欄選單的後台管理介面風格。

    - Grid (Row/Col)： AntD 使用 24 欄位系統。你需要學會如何使用 <Row gutter={16}> 來控制間距，以及用 <Col span={8}> 來分配比例。

2. 表單處理 (Form & useForm)
在 Demo 中，最常出現的就是輸入資料。AntD 的 Form 組件非常強大，你不需要為每個輸入框寫 useState：

    - Form.useForm()： 學習如何透過 form.getFieldsValue() 一次取得所有輸入資料。

    - onFinish： 這是 AntD 表單提交的核心，它會直接幫你驗證欄位並回傳物件，這對快速開發極度重要。

3. 資料展示組件 (Table & Card)
Demo 網頁的核心通常是展示「假資料」：

    - Table： 掌握 columns 的定義（如何渲染按鈕、標籤）以及 dataSource（你的假資料陣列）。

    - Card： 當你不想要表格時，用 Card 組件快速包裝資訊，看起來會很有質感。

4. 互動反饋 (Feedback Components)
為了讓 Demo 看起來「像真的」，這些效果必備：

    - Modal & Drawer： 點擊按鈕彈出視窗修改資料。

    - Message / Notification： 按下儲存後跳出「儲存成功」的小提示。

5. TypeScript 的整合應用
在使用 AntD 時，結合 TS 可以幫你省去查文件的時間：

    - 組件 Props 定型： 例如定義一個 Interface 來處理 Table 的數據來源。

    - 內建型別： 學習從 antd 匯入型別，例如 import type { FormProps } from 'antd';。

快速開發的「偷懶」準則 (Demo 導向)
既然不接後端，你的重點應該放在 「模擬行為」：

1. 準備一份強大的 Mock Data
    - 在專案裡建立一個 mockData.ts，用陣列存入幾十筆假資料。

    - 利用 setTimeout 模擬網路延遲，讓你的 loading 狀態（如 Spin 組件）有展示空間。

2. 善用 AntD 的預設值
    - 不要花太多時間在調 CSS 細節。AntD 的組件預設外觀已經很專業了，除非必要，否則盡量用組件自帶的屬性（如 size="large"，type="primary"）來調整。

3. 組件化你的「區塊」
把網頁拆成：

Navbar.tsx

Sidebar.tsx

MainTable.tsx

CreateEntryModal.tsx
這會讓你在調整 Demo 邏輯時不會迷航。