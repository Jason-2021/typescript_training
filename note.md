# TypeScript 核心必學清單 (資工背景專用版)

這份清單省略了基本的變數宣告與流程控制，專注於 TypeScript (TS) 作為強型別語言的核心特性，以及銜接 React 前端開發的必備知識。

## 1. 結構化型別系統 (Structural Typing)
不同於 C++ 的名目型別 (Nominal Typing)，TS 只要物件的「結構」符合，即視為型別相容。

* **`interface` (介面)**：主要用於定義物件或類別的形狀，支援繼承 (`extends`)。
* **`type` (型別別名)**：功能強大，支援聯合型別 (Union Types) 與交集型別 (Intersection Types)。
* **實戰重點**：在 React 中，所有 Component 的 `Props` (傳入參數) 都必須使用 `interface` 或 `type` 定義。

## 2. 泛型 (Generics)
類似 C++ 的 Template，用於建立可重用的元件或函式，同時保持型別安全。

* **語法**：`function process<T>(data: T): T { ... }`
* **實戰重點**：封裝 API 請求時必用。例如 `fetchData<User>()` 確保回傳的 JSON 解析後符合 `User` 結構。

## 3. 型別限縮與守衛 (Type Narrowing & Guards)
TS 編譯器會根據控制流 (Control Flow) 自動推斷並縮小變數的型別範圍。

* **關鍵字**：`typeof` (基本型別)、`instanceof` (類別實例)、`in` (檢查屬性是否存在)。
* **實戰重點**：處理 Union Types 時（如 `string | null`），必須先進行型別限縮，才能存取特定型別的屬性，這是避免 Runtime Error 的關鍵。

## 4. 實用工具型別 (Utility Types)
TS 內建的型別轉換工具，常應用於資料狀態的管理與轉換。

* **`Partial<T>`**：將 `T` 的所有屬性設為可選 (Optional)。
* **`Pick<T, Keys>`**：從 `T` 中挑選特定屬性組成新型別。
* **`Omit<T, Keys>`**：從 `T` 中剔除特定屬性組成新型別。
* **`Record<Keys, Type>`**：建構一個物件型別，其屬性鍵為 `Keys`，值為 `Type` (類似 Hash Map 的定義)。

## 5. 非同步處理 (非同步 I/O 與 Event Loop)
前端資料互動的核心，本質上是處理 Non-blocking I/O。

* **`Promise`**：代表一個未來才會完成（或失敗）的非同步操作結果。
* **`async / await`**：處理 `Promise` 的語法糖，讓非同步程式碼看起來像同步一樣。
* **實戰重點**：熟悉 `try...catch` 捕捉 `await` 過程中的錯誤，並理解並發處理 `Promise.all()` 的使用時機。