import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Plus, Trash2, Edit3 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx'

const ParametersEditor = ({ parameters = [], onChange }) => {
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editingParam, setEditingParam] = useState({
    name: '',
    type: '',
    description: ''
  })

  const parameterTypes = [
    'string',
    'number',
    'boolean',
    'array',
    'object',
    'date',
    'enum'
  ]

  const handleAddParameter = () => {
    setEditingParam({ name: '', type: '', description: '' })
    setEditingIndex(-1)
  }

  const handleEditParameter = (index) => {
    setEditingParam({ ...parameters[index] })
    setEditingIndex(index)
  }

  const handleSaveParameter = () => {
    if (!editingParam.name.trim() || !editingParam.type.trim() || !editingParam.description.trim()) {
      return
    }

    let newParameters
    if (editingIndex >= 0) {
      // 编辑现有参数
      newParameters = parameters.map((param, index) =>
        index === editingIndex ? { ...editingParam } : param
      )
    } else {
      // 添加新参数
      newParameters = [...parameters, { ...editingParam }]
    }

    onChange(newParameters)
    setEditingParam({ name: '', type: '', description: '' })
    setEditingIndex(-1)
  }

  const handleCancelEdit = () => {
    setEditingParam({ name: '', type: '', description: '' })
    setEditingIndex(-1)
  }

  const handleDeleteParameter = (index) => {
    const newParameters = parameters.filter((_, i) => i !== index)
    onChange(newParameters)
  }

  const handleParamChange = (field, value) => {
    setEditingParam(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isEditing = editingIndex >= 0 || editingParam.name || editingParam.type || editingParam.description

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">参数列表 ({parameters.length})</span>
        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddParameter}
            className="flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            添加参数
          </Button>
        )}
      </div>

      {/* 参数列表 */}
      {parameters.length > 0 && (
        <div className="space-y-2">
          {parameters.map((param, index) => (
            <Card key={index} className="p-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">{param.name}</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {param.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{param.description}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditParameter(index)}
                    disabled={isEditing}
                    className="h-8 w-8 p-0"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isEditing}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认删除参数</AlertDialogTitle>
                        <AlertDialogDescription>
                          确定要删除参数 "{param.name}" 吗？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteParameter(index)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          删除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 编辑表单 */}
      {isEditing && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {editingIndex >= 0 ? '编辑参数' : '添加新参数'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="param_name">参数名称 *</Label>
                <Input
                  id="param_name"
                  value={editingParam.name}
                  onChange={(e) => handleParamChange('name', e.target.value)}
                  placeholder="例如: brand"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="param_type">参数类型 *</Label>
                <Select
                  value={editingParam.type}
                  onValueChange={(value) => handleParamChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择参数类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {parameterTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="param_description">参数描述 *</Label>
              <Textarea
                id="param_description"
                value={editingParam.description}
                onChange={(e) => handleParamChange('description', e.target.value)}
                placeholder="详细描述参数的用途和约束条件..."
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleSaveParameter}
                disabled={!editingParam.name.trim() || !editingParam.type.trim() || !editingParam.description.trim()}
                size="sm"
              >
                {editingIndex >= 0 ? '保存修改' : '添加参数'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                size="sm"
              >
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {parameters.length === 0 && !isEditing && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">暂无参数配置</p>
          <p className="text-xs">点击"添加参数"按钮开始配置</p>
        </div>
      )}
    </div>
  )
}

export default ParametersEditor

