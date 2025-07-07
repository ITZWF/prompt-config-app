
# 页面设计思路

## 整体布局
页面将分为左右两栏或上下两部分，左侧或上方为导航/菜单，右侧或下方为内容区域。内容区域将包含两个主要模块：
1. **工具配置 (Tools Configuration)**
2. **行业&场景 Prompt 配置 (Industry & Scenario Prompt Configuration)**

每个模块内部将包含列表展示和表单编辑/添加功能。

## 组件划分

### 1. App.js (或类似的根组件)
- 负责整体布局（如侧边栏导航和主内容区域）。
- 管理当前选中的配置类型（Tools 或 Industry/Scenario Prompt）。

### 2. ToolsConfiguration.js
- **功能**: 管理和展示工具列表，提供添加、编辑、删除工具的功能。
- **子组件**:
    - `ToolList.js`: 展示工具列表，每行显示工具的基本信息，并提供“编辑”和“删除”按钮。
    - `ToolForm.js`: 用于添加或编辑单个工具的表单。包含以下字段：
        - `tool_name` (文本输入)
        - `tool_type` (下拉选择或文本输入)
        - `tool_desc` (文本区域)
        - `industry_affiliation` (文本输入)
        - `application_scenario` (文本输入)
        - `ParametersEditor.js`: 用于编辑工具参数的子组件。

### 3. ParametersEditor.js
- **功能**: 在 `ToolForm` 内部，用于管理一个工具的参数列表。
- **实现**: 可以是一个可编辑的表格，或者一个参数项的列表，每个参数项有“添加”、“编辑”、“删除”按钮。
- **字段**: `name` (文本输入), `type` (下拉选择或文本输入), `description` (文本区域)。

### 4. IndustryScenarioPromptConfiguration.js
- **功能**: 管理和展示行业&场景 Prompt 列表，提供添加、编辑、删除功能。
- **子组件**:
    - `IndustryScenarioPromptList.js`: 展示列表，每行显示行业、场景和部分 Prompt 内容，提供“编辑”和“删除”按钮。
    - `IndustryScenarioPromptForm.js`: 用于添加或编辑单个行业&场景 Prompt 的表单。
        - `industry` (文本输入)
        - `scenario` (文本输入)
        - `bg_klg_prompt` (文本区域)

## 数据结构 (前端模拟)

```javascript
// Tools 数据结构示例
[
  {
    "tool_name": "get_mention_count",
    "tool_type": "function",
    "tool_desc": "查询品牌/车系的提及量（声量），需至少提供品牌或车系参数",
    "industry_affiliation": "汽车行业",
    "application_scenario": "市场分析",
    "tool_parameters": [
      { "name": "brand", "type": "string", "description": "品牌名称，多个用中文顿号分割（如 `长安、阿维塔`)" },
      { "name": "carSeries", "type": "string", "description": "车系名称，多个用中文顿号分割（如 `帕萨特、SU7`)" },
      { "name": "datetimeType", "type": "string", "description": "时间粒度，必填，可选值：`年、月、周、日`" }
    ]
  }
]

// Industry & Scenario Prompt 数据结构示例
[
  {
    "industry": "汽车行业",
    "scenario": "质量把控",
    "bg_klg_prompt": "当前为汽车质量分析场景，需关注负面情感对应的具体部件（如发动机、变速箱）及故障关键词，使用四级标签精准定位问题。"
  }
]
```

## 美观性考虑
- 考虑使用 Material-UI, Ant Design 或 Chakra UI 等组件库来快速构建美观的界面。
- 统一的字体、颜色和间距。
- 响应式设计，适应不同屏幕尺寸。
- 友好的表单验证和错误提示。
- 列表的分页和搜索功能（可选，根据时间决定）。

## 通用性考虑
- 组件化设计，方便复用和维护。
- 数据与 UI 分离，方便未来与后端 API 集成。
- 灵活的表单字段配置，可以根据数据结构动态生成表单（高级功能，初期可硬编码）。


