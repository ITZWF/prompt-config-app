import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Edit, Trash2, Settings, Code, Tag } from 'lucide-react'
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

const ToolList = ({ tools, onEdit, onDelete }) => {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="p-4 bg-muted/30 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Settings className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-3">暂无工具配置</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          开始创建您的第一个工具配置，构建强大的 AI 工具库
        </p>
        <div className="text-sm text-muted-foreground">
          点击上方的 <span className="font-medium text-primary">"添加工具"</span> 按钮开始
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {tools.map((tool) => (
        <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-700/50 hover:scale-[1.02]">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {tool.tool_name}
                  </CardTitle>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                    {tool.tool_type}
                  </Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700 dark:border-green-700 dark:text-green-300">
                    {tool.industry_affiliation}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200">
                    {tool.application_scenario}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(tool)}
                  className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20"
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
                      <AlertDialogTitle>确认删除工具</AlertDialogTitle>
                      <AlertDialogDescription>
                        确定要删除工具 <span className="font-semibold">"{tool.tool_name}"</span> 吗？此操作无法撤销。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(tool.id)}
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
          <CardContent className="space-y-5">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">功能描述</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.tool_desc}
              </p>
            </div>
            
            {tool.tool_parameters && tool.tool_parameters.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-slate-500" />
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200">
                    参数列表 ({tool.tool_parameters.length})
                  </h4>
                </div>
                <div className="grid gap-3">
                  {tool.tool_parameters.map((param, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                      <Badge variant="outline" className="text-xs font-mono bg-slate-100 dark:bg-slate-600">
                        {param.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                          {param.name}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {param.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ToolList

