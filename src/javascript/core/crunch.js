function Crunch()
{
    ExitChallenge();
    Reset();
    GestionStatistiques();

}

function ManageTimeShards()
{
    ressources.timeShards += TimeShardsGain()
}

function TimeShardsGain()
{
    return 1;
}

function Reset()
{
    ResetRessources();
    ManageTimeShards();
    ResetEntites();
}

function ResetEntites()
{
    
}


function ResetRessources()
{
    ressources.particules = 1


    ResetDensite();

    AfficherRessources();
}

function ResetDensite()
{

}

function GestionStatistiques()
{
    return null;
}