import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Save, X } from 'lucide-react'

const IndustryScenarioPromptForm = ({ prompt, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    industry: '',
    scenario: '',
    bg_klg_prompt: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (prompt) {
      setFormData(prompt)
    }
  }, [prompt])

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

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.industry.trim()) {
      newErrors.industry = '行业不能为空'
    }
    
    if (!formData.scenario.trim()) {
      newErrors.scenario = '场景不能为空'
    }
    
    if (!formData.bg_klg_prompt.trim()) {
      newErrors.bg_klg_prompt = '背景知识 Prompt 不能为空'
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

  const industries = [
    '汽车行业',
    '金融行业',
    '电商行业',
    '教育行业',
    '医疗行业',
    '制造业',
    '房地产',
    '互联网',
    '零售业',
    '物流行业',
    '能源行业',
    '农业'
  ]

  const scenariosByIndustry = {
    '汽车行业': [
      '质量把控',
      '市场分析',
      '用户反馈分析',
      '竞品分析',
      '销量预测',
      '客户满意度',
      '产品评价',
      '品牌声量'
    ],
    '金融行业': [
      '风险评估',
      '客户分析',
      '市场趋势',
      '投资建议',
      '信用评级',
      '合规检查'
    ],
    '电商行业': [
      '商品推荐',
      '用户行为分析',
      '价格策略',
      '库存管理',
      '客户服务',
      '营销效果'
    ],
    '教育行业': [
      '学习效果评估',
      '课程推荐',
      '学生行为分析',
      '教学质量',
      '知识图谱'
    ],
    '医疗行业': [
      '诊断辅助',
      '药物分析',
      '患者管理',
      '医疗质量',
      '健康监测'
    ],
    '制造业': [
      '质量控制',
      '生产优化',
      '设备维护',
      '供应链管理',
      '成本分析'
    ],
    '房地产': [
      '市场分析',
      '价格预测',
      '客户需求',
      '投资评估',
      '区域分析'
    ],
    '互联网': [
      '用户增长',
      '产品优化',
      '内容推荐',
      '数据分析',
      '运营策略'
    ]
  }

  const availableScenarios = scenariosByIndustry[formData.industry] || []

  const promptTemplates = {
    '汽车行业-质量把控': '当前为汽车质量分析场景，需关注负面情感对应的具体部件（如发动机、变速箱）及故障关键词，使用四级标签精准定位问题。',
    '汽车行业-市场分析': '当前为汽车市场分析场景，需关注品牌声量、竞品对比、用户偏好等关键指标，结合时间维度进行趋势分析。',
    '金融行业-风险评估': '当前为金融风险评估场景，需关注风险指标、历史数据、市场波动等因素，进行综合风险评级和预警。',
    '电商行业-用户行为分析': '当前为电商用户行为分析场景，需关注用户购买路径、偏好变化、转化率等关键指标，优化用户体验。'
  }

  const handleIndustryChange = (industry) => {
    handleInputChange('industry', industry)
    // 清空场景选择，因为不同行业的场景不同
    handleInputChange('scenario', '')
  }

  const handleScenarioChange = (scenario) => {
    handleInputChange('scenario', scenario)
    // 自动填充模板（如果有的话）
    const templateKey = `${formData.industry}-${scenario}`
    const template = promptTemplates[templateKey]
    if (template && !formData.bg_klg_prompt.trim()) {
      handleInputChange('bg_klg_prompt', template)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{prompt ? '编辑 Prompt 配置' : '添加新 Prompt 配置'}</CardTitle>
        <CardDescription>
          {prompt ? '修改行业场景 Prompt 配置信息' : '创建新的行业场景 Prompt 配置'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">行业 *</Label>
              <Select
                value={formData.industry}
                onValueChange={handleIndustryChange}
              >
                <SelectTrigger className={errors.industry ? 'border-destructive' : ''}>
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
              {errors.industry && (
                <p className="text-sm text-destructive">{errors.industry}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenario">场景 *</Label>
              <Select
                value={formData.scenario}
                onValueChange={handleScenarioChange}
                disabled={!formData.industry}
              >
                <SelectTrigger className={errors.scenario ? 'border-destructive' : ''}>
                  <SelectValue placeholder={formData.industry ? "选择场景" : "请先选择行业"} />
                </SelectTrigger>
                <SelectContent>
                  {availableScenarios.map((scenario) => (
                    <SelectItem key={scenario} value={scenario}>
                      {scenario}
                    </SelectItem>
                  ))}
                  {/* 允许自定义场景 */}
                  <SelectItem value="custom">自定义场景...</SelectItem>
                </SelectContent>
              </Select>
              {errors.scenario && (
                <p className="text-sm text-destructive">{errors.scenario}</p>
              )}
            </div>
          </div>

          {/* 如果选择了自定义场景，显示输入框 */}
          {formData.scenario === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="custom_scenario">自定义场景名称 *</Label>
              <Input
                id="custom_scenario"
                placeholder="输入自定义场景名称"
                onChange={(e) => handleInputChange('scenario', e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bg_klg_prompt">背景知识 Prompt *</Label>
            <Textarea
              id="bg_klg_prompt"
              value={formData.bg_klg_prompt}
              onChange={(e) => handleInputChange('bg_klg_prompt', e.target.value)}
              placeholder="输入针对该行业和场景的背景知识提示语，包含分析要点和指导建议..."
              rows={6}
              className={errors.bg_klg_prompt ? 'border-destructive' : ''}
            />
            {errors.bg_klg_prompt && (
              <p className="text-sm text-destructive">{errors.bg_klg_prompt}</p>
            )}
            <p className="text-xs text-muted-foreground">
              提示：可以包含分析维度、关键指标、注意事项等内容，帮助 AI 更好地理解业务场景
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {prompt ? '保存修改' : '创建配置'}
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

export default IndustryScenarioPromptForm

