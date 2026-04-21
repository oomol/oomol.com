import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@site/src/lib/utils";
import * as React from "react";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-[var(--oomol-radius-lg)] border border-[var(--oomol-divider)] bg-[var(--oomol-bg-container)] p-[3px] text-[var(--oomol-text-secondary)]",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // border-0 + bg-transparent 显式覆盖浏览器 <button> 默认样式
      // (项目 Tailwind preflight 被关掉了，所以必须手动重置)
      "inline-flex h-full items-center justify-center whitespace-nowrap rounded-[var(--oomol-radius-md)] px-3",
      "border-0 bg-transparent cursor-pointer appearance-none",
      "text-oomol-mono font-medium tracking-[-0.005em] text-[var(--oomol-text-secondary)]",
      "ring-offset-[var(--oomol-bg-base)] transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "hover:text-[var(--oomol-text-primary)]",
      "data-[state=active]:bg-[var(--oomol-bg-base)] data-[state=active]:text-[var(--oomol-text-primary)]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-[var(--oomol-bg-base)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
