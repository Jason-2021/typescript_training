在 Ant Design (AntD) 中，排版（Layout）主要由兩個核心層次組成：宏觀的「整體框架 (Layout)」 與 微觀的「內容柵格 (Grid)」。

既然你的目標是快速刻出 Demo，掌握這兩套組件就能搞定 90% 的畫面佈局。

一、 整體框架：Layout 組件
如果你要做的網頁長得像「管理後台」或「帶有側邊欄的工具」，Layout 是你的首選。它定義了網頁的頂層結構。

核心子組件：
- Layout：容器組件，外層必須包這個。

- Header：頂部導航欄。

- Sider：側邊菜單欄。

- Content：主內容區。

- Footer：底部資訊欄。

常見結構範例：
```TypeScript
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider>側邊欄菜單</Sider>
    <Layout>
      <Header style={{ background: '#fff' }}>頂部導航</Header>
      <Content style={{ margin: '24px' }}>主要內容區</Content>
      <Footer>Ant Design ©2026</Footer>
    </Layout>
  </Layout>
);
```
二、 內容排版：Grid 柵格系統
在 Content 內部，當你需要把圖片、表單、文字排成一排或多欄時，就輪到 Grid 登場。AntD 的柵格系統基於 Flexbox，並將寬度劃分為 24 份。

核心屬性：
- Row：行。

- Col：列。你透過 span 屬性定義這一個 Col 佔據 24 份中的幾份。

- Gutter：控制列與列之間的間距（例如 gutter={16}）。

實戰用法：
```TypeScript
import { Row, Col } from 'antd';

// 三等分：24 / 8 = 3
<Row gutter={[16, 16]}>
  <Col span={8}><div>第一欄</div></Col>
  <Col span={8}><div>第二欄</div></Col>
  <Col span={8}><div>第三欄</div></Col>
</Row>
```

響應式排版 (Responsive)：
AntD 內建了斷點（Breakpoints），讓你不用寫 Media Query 就能適應手機和電腦：

- xs: <576px

- sm: ≥576px

- md: ≥768px

- lg: ≥992px

- xl: ≥1200px

```TypeScript
// 在電腦上佔 6 份 (1/4)，在手機上佔 24 份 (全寬)
<Col xs={24} lg={6}>內容塊</Col>
```

三、 微調工具：Space 與 Flex
在現代 AntD 中，為了避免寫過多的自定義 CSS，這兩個組件非常常用：

1. Space (間距)：

    - 用於解決組件之間的固定間距（例如兩個按鈕併排不要黏在一起）。

    - ```<Space size="middle">``` 或 ```<Space direction="vertical">```。

2. Flex (彈性佈局)：

    - AntD v5 引入的組件，直接封裝了 CSS Flexbox 屬性。

    - ```<Flex justify="space-between" align="center">```。

給 Demo 網頁的實作準則
1. 先 Layout 後 Grid：
    先決定你的網頁有沒有側邊欄（Sider）。如果有，先用 Layout 套件把大框架架起來。

2. 善用 Card 組件包裹內容：
    在 Content 區塊內，不要直接寫文字。先放一個 Row，裡面放 Col，再在 Col 裡面放 Card。這樣 Demo 看起來會非常乾淨、有層次感。

3. 固定高度設定：
    為了讓 Demo 看起來像個完整的 App，外層 Layout 通常會加上 style={{ minHeight: '100vh' }}，確保背景色能撐滿整個螢幕。

4. Offset 屬性（留白）：
    如果你的內容不想靠左，可以使用 offset。例如 <Col span={12} offset={6}> 會讓內容水平置中（佔 12 份，左邊空 6 份）。