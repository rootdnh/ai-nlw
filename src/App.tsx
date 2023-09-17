import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileVideo, Github, Upload, Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
 Select,
 SelectValue,
 SelectTrigger,
 SelectContent,
 SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

function App() {
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
      />
      <Textarea
       className="resize-none p-4"
       placeholder="Resultado gerado pela IA..."
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
      <form className="space-y-6">
       <label
        className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
        htmlFor="video"
       >
        <FileVideo className="w-4 h-4" />
        Selecione um vídeo
       </label>

       <input type="file" id="video" accept="video/mp4" className="sr-only" />

       <Separator />

       <div className="space-y-2">
        <Label htmlFor="transcription_video">Promp de transcrição</Label>
        <Textarea
         id="transcription_video"
         className="h-20 leading-relaxed text-muted-foreground text-sm resize-none"
         placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
       </div>

       <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
       </Button>
      </form>

      <Separator />

      <Separator />
      <div className="space-y-2">
       <Label>Prompt</Label>
       <Select defaultValue="title">
        <SelectTrigger>
         <SelectValue placeholder="Selecione um prompt..." />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="title">Título do youtube</SelectItem>
         <SelectItem value="description">Descrição do youtube</SelectItem>
        </SelectContent>
       </Select>
      </div>

      <form className="space-y-6">
       <div className="space-y-2">
        <Label>Modelo</Label>
        <Select disabled defaultValue="gpt-3.5">
         <SelectTrigger>
          <SelectValue />
         </SelectTrigger>
         <SelectContent>
          <SelectItem value="gpt-3.5">GPT 3.5-turbo 16k</SelectItem>
         </SelectContent>
        </Select>
        <span className="block text-xs text-muted-foreground italic">
         Você podera costumizar está opção em breve
        </span>
       </div>

       <Separator />

       <div className="space-y-4">
        <Label>Temperatura</Label>
        <Slider min={0} max={1} step={0.1} />
        <span className="block text-xs text-muted-foreground italic leading-relaxed">
         Valores mais altos tendem a deixar o resultado mais criativo e com
         possíveis erros.
        </span>
       </div>
       <Separator />

       <Button type="submit" className="w-full">
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
