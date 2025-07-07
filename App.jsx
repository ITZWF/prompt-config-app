import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Settings, MessageSquare, Sparkles } from 'lucide-react'
import ToolsConfiguration from './components/ToolsConfiguration.jsx'
import IndustryScenarioPromptConfiguration from './components/IndustryScenarioPromptConfiguration.jsx'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('tools')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              动态 Prompt 配置管理系统
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            智能化管理工具配置和行业场景 Prompt，支持完整的 CRUD 操作，提升 AI 应用的灵活性和专业性
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
            <TabsTrigger value="tools" className="flex items-center gap-2 text-base">
              <Settings className="h-4 w-4" />
              工具配置 (Tools)
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              行业&场景 Prompt
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools" className="mt-0">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">工具配置管理</CardTitle>
                    <CardDescription className="text-base mt-1">
                      管理系统中的工具定义，包括工具名称、类型、描述、参数等信息
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ToolsConfiguration />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prompts" className="mt-0">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">行业&场景 Prompt 配置</CardTitle>
                    <CardDescription className="text-base mt-1">
                      管理不同行业和场景下的背景知识 Prompt 配置，提升 AI 分析的专业性
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <IndustryScenarioPromptConfiguration />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

