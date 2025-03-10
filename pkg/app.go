package pkg

import (
	"bufio"
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

type ImportResp struct {
	Err  error
	List []string
}

func (a *App) ImportFile() ImportResp {
	path, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return ImportResp{
			Err: err,
		}
	}

	f, err := os.Open(path)
	if err != nil {
		return ImportResp{
			Err: err,
		}
	}
	defer f.Close()

	// 创建一个 Scanner 来逐行读取文件
	scanner := bufio.NewScanner(f)

	// 初始化一个切片来存储每行数据
	var lines []string

	// 逐行读取文件并将每行添加到切片中
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	// 检查是否有读取错误
	if err := scanner.Err(); err != nil {
		return ImportResp{
			Err: err,
		}
	}

	return ImportResp{
		List: lines,
	}
}
