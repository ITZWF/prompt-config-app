import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Edit, Trash2, MessageSquare, Building, Target } from 'lucide-react'
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

const IndustryScenarioPromptList = ({ prompts, onEdit, onDelete }) => {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="p-4 bg-muted/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-3">暂无 Prompt 配置</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          创建您的第一个行业场景 Prompt 配置，让 AI 更好地理解业务场景
        </p>
        <div className="text-sm text-muted-foreground">
          点击上方的 <span className="font-medium text-primary">"添加 Prompt 配置"</span> 按钮开始
        </div>
      </div>
    )
  }

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="grid gap-6">
      {prompts.map((prompt) => (
        <Card key={prompt.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-white to-green-50/30 dark:from-slate-800 dark:to-green-900/10 hover:scale-[1.02]">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {prompt.industry} - {prompt.scenario}
                  </CardTitle>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {prompt.industry}
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300 flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {prompt.scenario}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(prompt)}
                  className="flex items-center gap-1 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/20"
                >
                  <Edit className="h-3 w-3" />
                  编辑
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-3 w-3" />
                      删除
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确认删除 Prompt 配置</AlertDialogTitle>
                      <AlertDialogDescription>
                        确定要删除 <span className="font-semibold">"{prompt.industry} - {prompt.scenario}"</span> 的 Prompt 配置吗？此操作无法撤销。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(prompt.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        确认删除
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                背景知识 Prompt
              </h4>
              <div className="bg-white dark:bg-slate-700/50 p-4 rounded-md border border-slate-200 dark:border-slate-600">
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {truncateText(prompt.bg_klg_prompt)}
                </p>
                {prompt.bg_klg_prompt.length > 200 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs mt-3 text-green-600 hover:text-green-700 dark:text-green-400"
                    onClick={() => onEdit(prompt)}
                  >
                    查看完整内容 →
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default IndustryScenarioPromptList

