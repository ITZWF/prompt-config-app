import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Save, X } from 'lucide-react'
import ParametersEditor from './ParametersEditor.jsx'

const ToolForm = ({ tool, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tool_name: '',
    tool_type: '',
    tool_desc: '',
    industry_affiliation: '',
    application_scenario: '',
    tool_parameters: []
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (tool) {
      setFormData(tool)
    }
  }, [tool])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleParametersChange = (parameters) => {
    setFormData(prev => ({
      ...prev,
      tool_parameters: parameters
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.tool_name.trim()) {
      newErrors.tool_name = '工具名称不能为空'
    }
    
    if (!formData.tool_type.trim()) {
      newErrors.tool_type = '工具类型不能为空'
    }
    
    if (!formData.tool_desc.trim()) {
      newErrors.tool_desc = '工具描述不能为空'
    }
    
    if (!formData.industry_affiliation.trim()) {
      newErrors.industry_affiliation = '行业归属不能为空'
    }
    
    if (!formData.application_scenario.trim()) {
      newErrors.application_scenario = '应用场景不能为空'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const toolTypes = [
    'function',
    'query',
    'analysis',
    'processing',
    'utility'
  ]

  const industries = [
    '汽车行业',
    '金融行业',
    '电商行业',
    '教育行业',
    '医疗行业',
    '制造业',
    '房地产',
    '互联网'
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tool ? '编辑工具' : '添加新工具'}</CardTitle>
        <CardDescription>
          {tool ? '修改工具配置信息' : '创建新的工具配置'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tool_name">工具名称 *</Label>
              <Input
                id="tool_name"
                value={formData.tool_name}
                onChange={(e) => handleInputChange('tool_name', e.target.value)}
                placeholder="例如: get_mention_count"
                className={errors.tool_name ? 'border-destructive' : ''}
              />
              {errors.tool_name && (
                <p className="text-sm text-destructive">{errors.tool_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool_type">工具类型 *</Label>
              <Select
                value={formData.tool_type}
                onValueChange={(value) => handleInputChange('tool_type', value)}
              >
                <SelectTrigger className={errors.tool_type ? 'border-destructive' : ''}>
                  <SelectValue placeholder="选择工具类型" />
                </SelectTrigger>
                <SelectContent>
                  {toolTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tool_type && (
                <p className="text-sm text-destructive">{errors.tool_type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry_affiliation">行业归属 *</Label>
              <Select
                value={formData.industry_affiliation}
                onValueChange={(value) => handleInputChange('industry_affiliation', value)}
              >
                <SelectTrigger className={errors.industry_affiliation ? 'border-destructive' : ''}>
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry_affiliation && (
                <p className="text-sm text-destructive">{errors.industry_affiliation}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="application_scenario">应用场景 *</Label>
              <Input
                id="application_scenario"
                value={formData.application_scenario}
                onChange={(e) => handleInputChange('application_scenario', e.target.value)}
                placeholder="例如: 市场分析"
                className={errors.application_scenario ? 'border-destructive' : ''}
              />
              {errors.application_scenario && (
                <p className="text-sm text-destructive">{errors.application_scenario}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool_desc">工具描述 *</Label>
            <Textarea
              id="tool_desc"
              value={formData.tool_desc}
              onChange={(e) => handleInputChange('tool_desc', e.target.value)}
              placeholder="详细描述工具的功能和用途..."
              rows={3}
              className={errors.tool_desc ? 'border-destructive' : ''}
            />
            {errors.tool_desc && (
              <p className="text-sm text-destructive">{errors.tool_desc}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>工具参数</Label>
            <ParametersEditor
              parameters={formData.tool_parameters}
              onChange={handleParametersChange}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {tool ? '保存修改' : '创建工具'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ToolForm

