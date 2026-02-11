function Crunch()
{
    ExitChallenge();
    
    ressources.particules = 1
    AfficherRessources()
    ManageTimeShards()
}

function ManageTimeShards()
{
    ressources.timeShards += TimeShardsGain()
}

function TimeShardsGain()
{
    return 1;
}