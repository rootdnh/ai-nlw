import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
 Select,
 SelectValue,
 SelectTrigger,
 SelectContent,
 SelectItem,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { VideoInputForm } from "@/components/video-input-form";
import { useState } from "react";
import { PromptSelect } from "./components/prompt-select";
import { Slider } from "./components/ui/slider";
import { useCompletion } from "ai/react";

function App() {
 const [temperature, setTemperature] = useState(0.5);
 const [videoId, setVideoId] = useState<string | null>(null);

 const {
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  completion,
  isLoading,
 } = useCompletion({
  api: "http://localhost:3000/ai-complete",
  body: {
   videoId,
   temperature,
  },
  headers: {
   "Content-Type": "application/json",
  },
 });

 return (
  <div className="min-h-screen flex flex-col">
   <header className="px-6 py-3 flex items-center justify-between border-b">
    <h1 className="text-xl font-bold">upload.ai</h1>
    <div className="flex items-center gap-3">
     <span className="text-small text-muted-foreground">
      Criado por <span className="text-blue-400">rootdnh</span>
     </span>

     <Separator orientation="vertical" className="h-6" />

     <Button variant="outline">
      <Github className="w-4 h-4 mr-2" />
      Github
     </Button>
    </div>
   </header>

   <main className="flex-1 p-6 flex gap-6">
    <div className="flex flex-col flex-1 gap-4">
     <div className="grid grid-rows-2 gap-4 flex-1">
      <Textarea
       className="resize-none p-4 leading-relaxed"
       placeholder="Inclua o prompt para IA..."
       value={input}
       onChange={handleInputChange}
      />
      <Textarea
       className="resize-none p-4"
       placeholder="Resultado gerado pela IA..."
       value={completion}
       readOnly
      />
     </div>
     <p className="text-sm text-muted-foreground">
      Lembre-se: você pode utilizar a variável{" "}
      <code className="text-blue-400">{"{transcript}"}</code> no seu prompt para
      adicionar o conteúdo da transcrição do vídeo selecionado
     </p>
    </div>
    <ScrollArea className="max-h-[80vh] pr-4">
     <aside className="w-80 pr-2">
      <VideoInputForm onVideoUploaded={setVideoId} />

      <Separator />
      
      <form onSubmit={handleSubmit} className="space-y-6">
       <div className="space-y-2">
        <Label>Prompt</Label>
        <PromptSelect onPromptSelected={setInput} />
       </div>

       <div className="space-y-2">
        <Label>Modelo</Label>
        <Select disabled defaultValue="gpt3.5">
         <SelectTrigger>
          <SelectValue />
         </SelectTrigger>
         <SelectContent>
          <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
         </SelectContent>
        </Select>
        <span className="block text-sm text-muted-foreground italic">
         Você poderá customizar essa opção em breve
        </span>
       </div>

       <Separator />

       <div className="space-y-4">
        <Label>Temperatura</Label>
        <Slider
         min={0}
         max={1}
         step={0.1}
         value={[temperature]}
         onValueChange={(value) => setTemperature(value[0])}
        />
        <span className="block text-sm text-muted-foreground italic leading-relaxed">
         Valores mais altor tendem a deixar o resultado mais criativo e com
         possíveis erros.
        </span>
       </div>

       <Separator />

       <Button disabled={isLoading} type="submit" className="w-full">
        Executar
        <Wand2 className="w-4 h-4 ml-2" />
       </Button>
      </form>
     </aside>
     <ScrollBar orientation="vertical" />
    </ScrollArea>
   </main>
  </div>
 );
}

export default App;
