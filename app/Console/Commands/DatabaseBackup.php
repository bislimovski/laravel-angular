<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;

class DatabaseBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will backup the current database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $date = Carbon::now()->format('Y-m-d_h-i');
        //see the log from storage/log
        Log::info($date);

        $username = env('DB_DATABASE');
        $password = env('DB_PASSWORD');
        $host = env('DB_HOST');
        $database = env('DB_DATABASE');

        $command = "mssqldump --user={$username} -p{$password} {$database} > {$date}.sql";

        $process = new Process($command);
        $process->start();

        Log::info('Process is running...');

        while($process->isRunning())
        {
            $local = Storage::disk('local');
            $local->put('gallery-app-db/'. $date. ".sql", file_get_contents("{$date}.sql"));
            //delete the file
            unlink("{$date}.sql");
        }

    }
}
