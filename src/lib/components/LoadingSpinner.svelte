<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
</script>

<div class="flex items-center justify-center">
  <div class="relative {sizeClasses[size]}">
    <!-- Outer ring -->
    <div class="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
    <!-- Spinning gradient ring -->
    <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-indigo-600 animate-spin"></div>
    <!-- Inner glow -->
    <div class="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse"></div>
  </div>
</div>