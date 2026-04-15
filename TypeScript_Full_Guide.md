# TypeScript & React 工程實戰完整指南：從 C++/Python 到現代前端

這份講義專為具備 C++ (資料結構/演算法) 與 Python (PyTorch/深度學習) 及系統程式 (OS) 背景的資工工程師設計。我們將略過「什麼是迴圈」等基礎，直接對照你熟悉的底層邏輯，建立現代 Web 開發的架構思維。

---

## 零、前端架構的思維轉換 (Mental Model)

作為有系統底層經驗的工程師，請用以下方式理解 Web 開發：

1. **TypeScript (TS) 的本質**：TS 是一種**「編譯期 (Compile-time)」**的型別系統。當 TS 被編譯為 JavaScript 在瀏覽器執行時，所有型別標記都會被抹除 (沒有 C++ 的 RTTI)。型別的存在是為了在開發階段捕捉邏輯錯誤與定義 API 介面。
2. **HTML 的本質**：不要死背標籤。把 HTML 想像成 **Tree Data Structure (DOM Tree)**。你只需要掌握 `div`, `span`, `button`, `input` 即可。
3. **CSS 的本質**：把 CSS 想像成物件在空間中的屬性配置。專注學習 **Flexbox** 與 **Box Model**，這是在分配陣列元素在 2D 空間中的排列方式。

---

## 一、TypeScript 基礎語法速成

### 1. 變數宣告與基本型別
徹底忘記 `var`，現代開發只使用 `let` 與 `const`。JS 底層只有雙精度浮點數，所以 TS 沒有 `int`/`float` 區別，全為 `number`。

```typescript
const age: number = 25;       // 不可重新賦值 (類似 C++ const)
let isWorking: boolean = true; // 可重新賦值

// 陣列與元組 (Tuple)
const scores: number[] = [85, 90, 92];
// Tuple: 長度與每個位置型別皆固定的陣列 (React useState 的核心回傳格式)
const position: [number, number] = [120.5, 23.4];
```
### 2. 函式與箭頭函式 (Arrow Functions)

在 React 中，幾乎所有的 UI 組件都是用箭頭函式撰寫的（類似 C++ 的 Lambda）。

```typescript
// 箭頭函式宣告 (實務最常用)
const multiply = (a: number, b: number): number => {
  return a * b;
};

// 若只有一行 return，可省略大括號
const add = (a: number, b: number): number => a + b;

// 可選參數 (?) 與預設參數
const greet = (name: string, title?: string): void => {
  console.log(title ? `Hello, ${title} ${name}` : `Hello, ${name}`);
};
```

### 3. 聯合型別 (Union Types) 與列舉 (Enum)

TS 允許一個變數同時允許「多種型別」，這比 Enum 更輕量且強大。

```typescript
// Enum (C++ 工程師熟悉的寫法)
enum TaskStatus { Todo = 0, InProgress = 1, Done = 2 }

// 字面值聯合型別 (Literal Union Types) - 實務更常用
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const fetchApi = (url: string, method: HttpMethod) => { /* ... */ }
fetchApi("/users", "GET");   // 合法
// fetchApi("/users", "PATCH"); // TS 編譯期錯誤！
```

### 4. 定義資料結構：Interface 與 Type

TS 是「結構化型別 (Structural Typing)」，只要物件的「形狀」符合，型別就相容。

```typescript
// interface：主要用來定義物件的形狀，支援繼承 (extends)
interface Cell {
  id: string;
  x: number;
  y: number;
  confidence: number;
  label?: string; // 可選屬性
}

// type：更靈活，可為聯合型別命名
type ID = string | number;
type User = { id: ID; name: string };
```

---

## 二、TypeScript 進階工程先修 (底層與架構)

當你需要實作複雜的資料結構或處理非同步 API 時，必須掌握以下特性。

### 1. 物件導向封裝與泛型 (Generics)

泛型類似 C++ `template`，允許推遲型別的決定。配合存取修飾子進行記憶體存取權限的封裝。

```typescript
class KeyValueStore<K, V> {
  private readonly capacity: number; // 唯讀且私有
  private store = new Map<K, V>();   // 內部隱藏的資料結構

  constructor(cap: number) {
    this.capacity = cap;
  }

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    // ! 稱為 Non-null Assertion，告訴編譯器跳過 null 檢查
    if (this.store.has(key)) return this.store.get(key)!;
    return undefined;
  }
}
```

### 2. 非同步控制流 (Promises & Async/Await)

網頁環境本質是單執行緒，所有 I/O 必須是 Non-blocking。Promise 就是處理這個非同步狀態機的核心。

- **Pending**: 等待中。
- **Fulfilled**: 成功 (`resolve`)。
- **Rejected**: 失敗 (`reject`)。

```typescript
// 定義一個回傳 Promise<T> 的函式型別
type Task<T> = () => Promise<T>;

const fetchSimulation: Task<string> = async () => {
  // await 會交出執行權給 Event Loop，直到 Promise 完成
  return new Promise(resolve => setTimeout(() => resolve("Data Loaded"), 1000));
};

async function processData(): Promise<void> {
  try {
    const result = await fetchSimulation(); 
    console.log(result);
  } catch (error) {
    console.error("Failed:", error); // 捕捉 Reject 狀態
  }
}
```

### 3. 動態型別推斷與收斂 (Type Guards)

- **`unknown`**: 頂級型別。代表「型別未知」，未經檢查前不允許操作 (比 `any` 安全)。
- **Type Guard (`is`)**: 自訂函式來收斂變數型別。
- **Utility Types**: `Partial<T>` (全轉可選), `Record<K, T>` (定義 Hash Map 結構)。

```typescript
// 型別守衛：檢查未知變數是否為純物件
function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

// 泛型交集 (&)：合併物件並精準推斷型別
function shallowMerge<T extends Record<string, any>, U extends Record<string, any>>(
  obj1: T, 
  obj2: U
): T & U {
  return { ...obj1, ...obj2 } as T & U; 
}
```

---

## 三、React 核心思維 (以 PyTorch/系統架構類比)

1. **組件 (Component) = `nn.Module`**：
    
    React 將介面拆分成獨立的 Component。輸入參數稱為 `Props` (唯讀，類似 Forward 函式的輸入)。
    
2. **狀態 (State) = 模型權重與隱藏狀態**：
    
    `useState` 儲存狀態。當 State 改變時，React 自動重新觸發渲染 (類似 Forward Pass)。
    
3. **副作用 (Effect) = Hook 回呼**：
    
    `useEffect` 用於處理 API 請求或訂閱事件 (類似 PyTorch Lightning 的 `on_train_batch_end`)。
    
4. **效能優化 (Memoization)**：
    
    資工背景需特別注意 `useMemo` 與 `useCallback`，用於快取計算結果與函式參考，避免 React 重新渲染時產生多餘的運算開銷。
    
5. **企業級生態圈**：
    - 狀態管理：Zustand (類似全域共享記憶體)。
    - API 管理：TanStack Query (自動處理快取、Retry 機制)。
    - 樣式：Tailwind CSS。

---

## 四、實戰演算法挑戰 (附詳解)

請透過這三個實戰題目，驗證你對 TypeScript 泛型、非同步與型別系統的掌握度。

### 題目一：泛型 LRU Cache

**目標**：實作具容量限制的快取。`get` 與 `put` 時間複雜度為 $O(1)$。

**考點**：Generics、Map 物件的順序性。

```typescript
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<K, V>(); // JS 的 Map 會保證鍵值的插入順序
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;

    // 取值後，將其移到 Map 尾端 (代表最新使用)
    const val = this.cache.get(key)!; 
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 取得第一個 key (最舊紀錄) 並刪除
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// 測資
const cache = new LRUCache<string, number>(2);
cache.put("A", 1);
cache.put("B", 2);
console.log(cache.get("A")); // 1 (A 變為最新)
cache.put("C", 3);           // 踢除 B
console.log(cache.get("B")); // undefined
```

---

### 題目二：非同步任務隊列 (Async Priority Queue)

**目標**：實作一個非同步任務執行器，限制最大並發數量 (Concurrency Limit)，並根據 Priority 決定執行順序。

**考點**：Promise 控制流、非同步狀態機封裝。

```typescript
type Task<T> = () => Promise<T>;

interface QueueItem<T> {
  task: Task<T>;
  priority: number;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

class AsyncPriorityQueue {
  private limit: number;
  private activeCount: number = 0;
  private queue: QueueItem<any>[] = []; 

  constructor(limit: number) {
    this.limit = limit;
  }

  enqueue<T>(task: Task<T>, priority: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, priority, resolve, reject });
      // 根據優先度降冪排序
      this.queue.sort((a, b) => b.priority - a.priority);
      this.runNext();
    });
  }

  private async runNext(): Promise<void> {
    if (this.activeCount >= this.limit || this.queue.length === 0) return;

    const item = this.queue.shift();
    if (!item) return;

    this.activeCount++;

    try {
      const result = await item.task();
      item.resolve(result); // 任務成功，回傳結果
    } catch (error) {
      item.reject(error);   // 任務失敗，拋出錯誤
    } finally {
      this.activeCount--;   // 釋放名額
      this.runNext();       // 遞迴呼叫下一輪
    }
  }
}

// 測資
const delay = (id: string, ms: number) => 
  new Promise<string>(resolve => setTimeout(() => resolve(id), ms));

const queue = new AsyncPriorityQueue(2); // 最大並發 2
queue.enqueue(() => delay("Task1", 100), 1).then(console.log);
queue.enqueue(() => delay("Task2", 50), 1).then(console.log);
queue.enqueue(() => delay("Task3_High", 200), 10).then(console.log);
queue.enqueue(() => delay("Task4_Low", 50), 0).then(console.log);

// 預期輸出順序: Task2 (t=50) -> Task1 (t=100) -> Task4_Low (t=150) -> Task3_High (t=250)
```

---

### 題目三：深度合併物件 (Deep Merge with Type Safety)

**目標**：實作 `deepMerge(target, source)`，遞迴合併巢狀物件。必須確保回傳結果具備正確的交集型別推斷。

**考點**：遞迴型別 (Recursive Types)、型別守衛 (Type Guards)。

```typescript
// 1. Type Guard: 確保變數是純物件 (非陣列、非 null)
function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}

// 2. 主函式：使用泛型與交集型別 (T & U) 確保型別安全
function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  // 淺拷貝 target 避免修改原始參考
  const output = { ...target } as any;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        // 兩者皆為物件，遞迴合併
        output[key] = deepMerge(targetValue, sourceValue);
      } else {
        // 否則直接覆蓋 (包含陣列或基本型別)
        output[key] = sourceValue;
      }
    });
  }
  return output;
}

// 測資
const obj1 = { a: 1, b: { c: 2, d: 3 }, arr: [1, 2] };
const obj2 = { b: { c: 99, e: 4 }, arr: [3], f: "hello" };

const result = deepMerge(obj1, obj2);
console.log(result); 
// 執行結果: { a: 1, b: { c: 99, d: 3, e: 4 }, arr: [3], f: 'hello' }

// 編譯期驗證：IDE 會正確推斷 result.b.e 為 number，result.f 為 string
```