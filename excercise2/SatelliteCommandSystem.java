import java.util.logging.Logger;

// ----- Satellite Class -----
class Satellite {
    private String orientation;
    private boolean solarPanelsActive;
    private int dataCollected;

    private static final Logger logger = Logger.getLogger(Satellite.class.getName());

    public Satellite() {
        this.orientation = "North";
        this.solarPanelsActive = false;
        this.dataCollected = 0;
        logger.info("Satellite initialized: Orientation=North, Solar Panels=Inactive, Data Collected=0");
    }

    public void rotate(String direction) {
        if (direction == null || direction.isEmpty()) {
            logger.warning("Invalid rotation command!");
            throw new IllegalArgumentException("Direction cannot be null or empty.");
        }
        this.orientation = direction;
        logger.info("Satellite rotated to " + direction);
    }

    public void activatePanels() {
        this.solarPanelsActive = true;
        logger.info("Solar Panels Activated");
    }

    public void deactivatePanels() {
        this.solarPanelsActive = false;
        logger.info("Solar Panels Deactivated");
    }

    public void collectData() {
        if (solarPanelsActive) {
            this.dataCollected += 10;
            logger.info("Data Collected: " + this.dataCollected + " units");
        } else {
            logger.warning("Cannot collect data! Solar panels are inactive.");
        }
    }

    public void printStatus() {
        System.out.println("----- Satellite Status -----");
        System.out.println("Orientation: " + orientation);
        System.out.println("Solar Panels: " + (solarPanelsActive ? "Active" : "Inactive"));
        System.out.println("Data Collected: " + dataCollected);
    }
}

// ----- Command Interface -----
interface Command {
    void execute();
}

// ----- Concrete Command Classes -----
class RotateCommand implements Command {
    private Satellite satellite;
    private String direction;

    public RotateCommand(Satellite satellite, String direction) {
        this.satellite = satellite;
        this.direction = direction;
    }

    @Override
    public void execute() {
        satellite.rotate(direction);
    }
}

class ActivatePanelsCommand implements Command {
    private Satellite satellite;

    public ActivatePanelsCommand(Satellite satellite) {
        this.satellite = satellite;
    }

    @Override
    public void execute() {
        satellite.activatePanels();
    }
}

class DeactivatePanelsCommand implements Command {
    private Satellite satellite;

    public DeactivatePanelsCommand(Satellite satellite) {
        this.satellite = satellite;
    }

    @Override
    public void execute() {
        satellite.deactivatePanels();
    }
}

class CollectDataCommand implements Command {
    private Satellite satellite;

    public CollectDataCommand(Satellite satellite) {
        this.satellite = satellite;
    }

    @Override
    public void execute() {
        satellite.collectData();
    }
}

// ----- Main Class -----
public class SatelliteCommandSystem {
    public static void main(String[] args) {
        try {
            Satellite satellite = new Satellite();

            // Execute commands
            Command rotateSouth = new RotateCommand(satellite, "South");
            Command activatePanels = new ActivatePanelsCommand(satellite);
            Command collectData = new CollectDataCommand(satellite);

            rotateSouth.execute();
            activatePanels.execute();
            collectData.execute();

            // Print final state
            satellite.printStatus();
        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
        }
    }
}
