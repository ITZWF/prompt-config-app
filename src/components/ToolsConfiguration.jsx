import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import ToolList from './ToolList.jsx'
import ToolForm from './ToolForm.jsx'

const ToolsConfiguration = () => {
  const [tools, setTools] = useState([
    {
      id: 1,
      tool_name: "get_mention_count",
      tool_type: "function",
      tool_desc: "查询品牌/车系的提及量（声量），需至少提供品牌或车系参数",
      industry_affiliation: "汽车行业",
      application_scenario: "市场分析",
      tool_parameters: [
        {
          name: "brand",
          type: "string",
          description: "品牌名称，多个用中文顿号分割（如 `长安、阿维塔`）"
        },
        {
          name: "carSeries",
          type: "string",
          description: "车系名称，多个用中文顿号分割（如 `帕萨特、SU7`）"
        },
        {
          name: "datetimeType",
          type: "string",
          description: "时间粒度，必填，可选值：`年、月、周、日`"
        }
      ]
    }
  ])
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTool, setEditingTool] = useState(null)

  const handleAddTool = () => {
    setEditingTool(null)
    setIsFormOpen(true)
  }

  const handleEditTool = (tool) => {
    setEditingTool(tool)
    setIsFormOpen(true)
  }

  const handleDeleteTool = (toolId) => {
    setTools(tools.filter(tool => tool.id !== toolId))
  }

  const handleSaveTool = (toolData) => {
    if (editingTool) {
      // 编辑现有工具
      setTools(tools.map(tool => 
        tool.id === editingTool.id 
          ? { ...toolData, id: editingTool.id }
          : tool
      ))
    } else {
      // 添加新工具
      const newTool = {
        ...toolData,
        id: Math.max(...tools.map(t => t.id), 0) + 1
      }
      setTools([...tools, newTool])
    }
    setIsFormOpen(false)
    setEditingTool(null)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingTool(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">工具列表</h3>
        <Button onClick={handleAddTool} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          添加工具
        </Button>
      </div>

      {isFormOpen ? (
        <ToolForm
          tool={editingTool}
          onSave={handleSaveTool}
          onCancel={handleCancelForm}
        />
      ) : (
        <ToolList
          tools={tools}
          onEdit={handleEditTool}
          onDelete={handleDeleteTool}
        />
      )}
    </div>
  )
}

export default ToolsConfiguration

