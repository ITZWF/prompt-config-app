import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import IndustryScenarioPromptList from './IndustryScenarioPromptList.jsx'
import IndustryScenarioPromptForm from './IndustryScenarioPromptForm.jsx'

const IndustryScenarioPromptConfiguration = () => {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      industry: "汽车行业",
      scenario: "质量把控",
      bg_klg_prompt: "当前为汽车质量分析场景，需关注负面情感对应的具体部件（如发动机、变速箱）及故障关键词，使用四级标签精准定位问题。"
    },
    {
      id: 2,
      industry: "汽车行业",
      scenario: "市场分析",
      bg_klg_prompt: "当前为汽车市场分析场景，需关注品牌声量、竞品对比、用户偏好等关键指标，结合时间维度进行趋势分析。"
    }
  ])
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState(null)

  const handleAddPrompt = () => {
    setEditingPrompt(null)
    setIsFormOpen(true)
  }

  const handleEditPrompt = (prompt) => {
    setEditingPrompt(prompt)
    setIsFormOpen(true)
  }

  const handleDeletePrompt = (promptId) => {
    setPrompts(prompts.filter(prompt => prompt.id !== promptId))
  }

  const handleSavePrompt = (promptData) => {
    if (editingPrompt) {
      // 编辑现有 Prompt
      setPrompts(prompts.map(prompt => 
        prompt.id === editingPrompt.id 
          ? { ...promptData, id: editingPrompt.id }
          : prompt
      ))
    } else {
      // 添加新 Prompt
      const newPrompt = {
        ...promptData,
        id: Math.max(...prompts.map(p => p.id), 0) + 1
      }
      setPrompts([...prompts, newPrompt])
    }
    setIsFormOpen(false)
    setEditingPrompt(null)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingPrompt(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Prompt 配置列表</h3>
        <Button onClick={handleAddPrompt} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          添加 Prompt 配置
        </Button>
      </div>

      {isFormOpen ? (
        <IndustryScenarioPromptForm
          prompt={editingPrompt}
          onSave={handleSavePrompt}
          onCancel={handleCancelForm}
        />
      ) : (
        <IndustryScenarioPromptList
          prompts={prompts}
          onEdit={handleEditPrompt}
          onDelete={handleDeletePrompt}
        />
      )}
    </div>
  )
}

export default IndustryScenarioPromptConfiguration

